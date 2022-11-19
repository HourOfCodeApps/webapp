// Vendor
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { eventChannel } from 'redux-saga';
import {
  call, takeEvery, takeLatest, fork, put, select, take,
} from 'redux-saga/effects';
import get from 'lodash/get';
import pick from 'lodash/pick';

import loadUserInfo from './helpers/loadUserInfo';

// Application
import {
  FORGOT_PASSWORD,
  SIGNIN,
  SIGNOUT,
  SIGNUP,
  STATE_INIT,
  SIGNIN_EMAILPASSWORD_PROVIDER,
  SIGNIN_GOOGLE_PROVIDER,
  UPDATE_USER,
} from './constants';

import {
  forgotPasswordFailure,
  forgotPasswordSuccess,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
  signUpSuccess,
  stateChanged,
  updateUserFailure,
  updateUserSuccess,
} from './actions';

import { selectAuth } from './selectors';

const googleProvider = new firebase.auth.GoogleAuthProvider();

const updateUserInfo = (section, uid, info) => firebase.firestore()
  .collection(section).doc(uid).set(info, { merge: true });

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

function* forgotPassword({ payload: { email } }) {
  try {
    const actionCodeSettings = {
      url: `${window.location.protocol}//${window.location.host}`,
    };

    yield firebase.auth().sendPasswordResetEmail(email, actionCodeSettings);

    yield put(forgotPasswordSuccess());
  } catch (error) {
    yield put(forgotPasswordFailure(error));
  }
}

function* signUp({ payload: { userData } }) {
  try {
    const {
      email, password, role, wasMentorBefore, policyAgreed,
    } = userData;
    const result = yield firebase.auth().createUserWithEmailAndPassword(email, password);

    const { uid } = result.user;
    const userDocRef = firebase.firestore().collection('users').doc(uid);

    const doc = yield userDocRef.get();

    if (doc.exists) {
      throw new Error('Already Exists');
    }

    yield userDocRef.set({
      email,
      policyAgreed,
    });

    if (role === 'mentor') {
      yield firebase.firestore().collection('mentors').doc(uid).set({
        wasMentorBefore: Boolean(wasMentorBefore),
      });
    }

    if (role === 'teacher') {
      yield firebase.firestore().collection('teachers').doc(uid).set({
        isApproved: false,
      });
    }

    const createdDoc = yield userDocRef.get();
    if (!createdDoc.exists) {
      throw new Error('oops');
    }
    const user = { uid, ...createdDoc.data() };

    const actionCodeSettings = {
      url: `${window.location.protocol}//${window.location.host}`,
    };

    yield firebase.auth().currentUser.sendEmailVerification(actionCodeSettings);

    yield put(signUpSuccess(user));
    // yield put(loadUserSuccess(user));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

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

  while (true) {
    const authState = yield take(authStateChannel);

    const user = authState ? yield loadUserInfo() : null;

    yield put(stateChanged(authState || null, user));
  }
}


function* updateUser({ payload }) {
  try {
    const {
      userData: {
        profile,
        mentor,
        teacher,
        // role, school, wasMentorBefore, ...userData
      },
    } = payload;
    const auth = yield select(selectAuth());

    if (!auth || !auth.uid) {
      throw new Error('You should be signed in');
    }

    const { uid } = auth;

    const profileFields = pick(profile, ['firstName', 'lastName', 'phone']);

    const { currentUser } = firebase.auth();
    yield currentUser.updateProfile({
      displayName: `${profileFields.firstName} ${profileFields.lastName}`,
    });

    yield updateUserInfo('users', uid, profile);

    if (mentor) {
      yield updateUserInfo('mentors', uid, mentor);
    }

    if (teacher) {
      yield updateUserInfo('teachers', uid, { schoolId: get(teacher, 'school.id') });
    }

    const user = yield loadUserInfo(uid);

    if (!user) {
      throw new Error('oops');
    }

    yield put(updateUserSuccess(user));
    yield put(loadUserSuccess(user));
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield takeLatest(SIGNIN, signIn);
  yield takeLatest(SIGNOUT, signOut);
  yield takeLatest(STATE_INIT, stateInit);
  // yield takeLatest(LOAD_USER, loadUser);
  yield takeLatest(SIGNUP, signUp);
  yield takeEvery(UPDATE_USER, updateUser);
  yield takeLatest(FORGOT_PASSWORD, forgotPassword);
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
