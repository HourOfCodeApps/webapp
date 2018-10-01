// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import { takeLatest, fork, put } from 'redux-saga/effects';

// Application
import {
  FETCH_SCHOOLS,
} from './constants';

import {
  fetchSchoolsFailure,
  fetchSchoolsSuccess,
} from './actions';

function* fetchSchools() {
  try {
    const snapshots = yield firebase.firestore().collection('schools').get();

    const users = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    yield put(fetchSchoolsSuccess(users));
  } catch (error) {
    yield put(fetchSchoolsFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, FETCH_SCHOOLS, fetchSchools);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  fetchSchools,
  rootSaga,
};
