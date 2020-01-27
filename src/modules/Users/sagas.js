// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import { takeLatest, fork, put } from 'redux-saga/effects';

// Application
import {
  FETCH_USERS,
} from './constants';

import {
  fetchUsersFailure,
  fetchUsersSuccess,
} from './actions';

function* fetchUsers() {
  try {
    const snapshots = yield firebase.firestore().collection('users').get();

    const users = snapshots.docs.map(doc => ({ ...doc.data(), uid: doc.id }));

    yield put(fetchUsersSuccess(users));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield takeLatest(FETCH_USERS, fetchUsers);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  fetchUsers,
  rootSaga,
};
