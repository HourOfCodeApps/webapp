// Vendor
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {
  takeEvery, takeLatest, fork, put, select,
} from 'redux-saga/effects';
import pick from 'lodash/pick';

import loadUserInfo, { loadUserSection } from 'shared/utils/helpers/loadUserInfo';

// Application


import { selectAuth, loadUserSuccess } from 'modules/Auth';
import {
  FETCH_ME,
  UPDATE_ME,
} from './constants';

import {
  fetchMeFailure,
  fetchMeSuccess,
  updateMeFailure,
  updateMeSuccess,
} from './actions';


const updateUserSection = (section, uid, info) => firebase.firestore()
  .collection(section).doc(uid).set(info, { merge: true });

function* fetchMe() {
  try {
    const auth = yield select(selectAuth());

    if (!auth || !auth.uid) {
      throw new Error('You should be signed in');
    }

    const { uid } = auth;
    const profile = yield loadUserSection('users', uid);

    yield put(fetchMeSuccess(profile));
  } catch (error) {
    yield put(fetchMeFailure(error));
  }
}

function* updateMe({ payload: { userData } }) {
  try {
    const auth = yield select(selectAuth());

    if (!auth || !auth.uid) {
      throw new Error('You should be signed in');
    }

    const { uid } = auth;
    // const profile = pick(userData, ['firstName', 'lastName', 'email', 'phone']);
    const profile = pick(userData, ['firstName', 'lastName', 'phone']);

    const { currentUser } = firebase.auth();
    yield currentUser.updateProfile({
      displayName: `${profile.firstName} ${profile.lastName}`,
    });

    yield updateUserSection('users', uid, profile);

    const user = yield loadUserInfo(uid);

    if (!user) {
      throw new Error('oops');
    }

    yield put(updateMeSuccess(user.profile));
    yield put(loadUserSuccess(user));
  } catch (error) {
    yield put(updateMeFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, FETCH_ME, fetchMe);
  yield fork(takeEvery, UPDATE_ME, updateMe);
}

// All sagas to be loaded by configureStore()
export default [
  rootSaga,
];
// Exports for testing
export {
  rootSaga,
};
