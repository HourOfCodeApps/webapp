// Vendor
import * as firebase from 'firebase';
import { eventChannel } from 'redux-saga';
import {
  call, takeLatest, fork, put, take,
} from 'redux-saga/effects';

// Application
import {
  LOGIN,
  LOGOUT,
  STATE_INIT,
  STATE_INIT_SUCCESS,
} from './constants';

import {
  loginFailure,
  loginSuccess,
  logoutFailure,
  logoutSuccess,
  stateChanged,
} from './actions';

const provider = new firebase.auth.GoogleAuthProvider();

function* login() {
  try {
    const { user } = yield firebase.auth().signInWithPopup(provider);

    yield put(loginSuccess(user));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* logout() {
  try {
    yield firebase.auth().signOut();
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
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
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, LOGIN, login);
  yield fork(takeLatest, LOGOUT, logout);
  yield fork(takeLatest, STATE_INIT, stateInit);
}

// All sagas to be loaded by configureStore()
export default [
  rootSaga,
];
// Exports for testing
export {
  login,
  logout,
  rootSaga,
  stateInit,
};
