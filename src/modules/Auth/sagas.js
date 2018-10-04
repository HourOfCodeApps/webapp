// Vendor
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { eventChannel } from 'redux-saga';
import {
  call, takeLatest, fork, put, select, take,
} from 'redux-saga/effects';

// Application
import {
  LOAD_USER,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  STATE_INIT,
  STATE_INIT_SUCCESS,
  SIGNIN_EMAILPASSWORD_PROVIDER,
  SIGNIN_GOOGLE_PROVIDER,
} from './constants';

import {
  loadUser as loadUserAction,
  loadUserFailure,
  loadUserSuccess,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signupFailure,
  signupSuccess,
  stateChanged,
} from './actions';

import { selectAuth } from './selectors';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInProvider = async (providerEnum, data) => {
  switch (providerEnum) {
    case SIGNIN_GOOGLE_PROVIDER:
      return firebase.auth().signInWithPopup(googleProvider);

    case SIGNIN_EMAILPASSWORD_PROVIDER:
      return firebase.auth().signInWithEmailAndPassword(data.email, data.password);

    default:
      throw new Error('No Auth Provider');
  }
};

function* signIn({ payload: { provider, data } }) {
  try {
    const { user } = yield signInProvider(provider, data);

    yield put(signInSuccess(user));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* signOut() {
  try {
    yield firebase.auth().signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

function createAuthStateChannel() {
  return eventChannel(emit => firebase.auth().onIdTokenChanged(state => emit(state || false)));
}

function* stateInit() {
  const authStateChannel = yield call(createAuthStateChannel);
  yield put({ type: STATE_INIT_SUCCESS });

  while (true) {
    const authState = yield take(authStateChannel);
    yield put(stateChanged(authState || null));
    yield put(loadUserAction());
  }
}

function* loadUser() {
  const auth = yield select(selectAuth());

  if (!auth || !auth.uid) {
    yield put(loadUserSuccess(null));
    return;
  }

  const { uid } = auth;

  try {
    const doc = yield firebase.firestore().collection('users')
      .doc(uid).get();

    const user = doc.exists ? { uid, ...doc.data() } : null;
    yield put(loadUserSuccess(user));
  } catch (error) {
    yield put(loadUserFailure(error));
  }
}

function* signup({ payload: { userData } }) {
  const auth = yield select(selectAuth());

  if (!auth || !auth.uid) {
    yield put(signupFailure(new Error('no auth')));
    return;
  }

  const { uid } = auth;

  try {
    const doc = yield firebase.firestore().collection('users').doc(uid).get();

    if (doc.exists) {
      throw new Error('already exists');
    }
    yield firebase.firestore().collection('users').doc(uid).set(userData);

    const createdDoc = yield firebase.firestore().collection('users').doc(uid).get();
    if (!createdDoc.exists) {
      throw new Error('oops');
    }
    const user = { uid, ...createdDoc.data() };
    yield put(signupSuccess(user));
    yield put(loadUserSuccess(user));
  } catch (error) {
    yield put(signupFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, SIGNIN, signIn);
  yield fork(takeLatest, SIGNOUT, signOut);
  yield fork(takeLatest, STATE_INIT, stateInit);
  yield fork(takeLatest, LOAD_USER, loadUser);
  yield fork(takeLatest, SIGNUP, signup);
}

// All sagas to be loaded by configureStore()
export default [
  rootSaga,
];
// Exports for testing
export {
  signIn,
  signOut,
  rootSaga,
  stateInit,
};
