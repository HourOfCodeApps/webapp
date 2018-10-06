// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import { takeEvery, takeLatest, fork, put } from 'redux-saga/effects';

// Application
import {
  CREATE_SCHOOL,
  DELETE_SCHOOL,
  FETCH_SCHOOL,
  FETCH_SCHOOLS,
} from './constants';

import {
  createSchoolFailure,
  createSchoolSuccess,
  deleteSchoolFailure,
  deleteSchoolSuccess,
  fetchSchoolFailure,
  fetchSchoolSuccess,
  fetchSchoolsFailure,
  fetchSchoolsSuccess,
} from './actions';

function* createSchool({ payload: { data } }) {
  try {
    const docRef = yield firebase.firestore().collection('schools').add({ data });

    const createdSnapshot = yield docRef.get();

    const createdSchool = { ...createdSnapshot.data(), id: createdSnapshot.id };

    yield put(createSchoolSuccess(createdSchool));
  } catch (error) {
    yield put(createSchoolFailure(error));
  }
}

function* deleteSchool({ payload: { id } }) {
  try {
    yield firebase.firestore().collection('schools').doc(id).delete();

    yield put(deleteSchoolSuccess());
  } catch (error) {
    yield put(deleteSchoolFailure(error));
  }
}

function* fetchSchool({ payload: { id } }) {
  try {
    const snapshot = yield firebase.firestore().collection('schools').doc(id).get();

    if (!snapshot.exists) {
      throw new Error('Not Found');
    }

    const school = { ...snapshot.data(), id: snapshot.id };

    yield put(fetchSchoolSuccess(school));
  } catch (error) {
    yield put(fetchSchoolFailure(error));
  }
}

function* fetchSchools() {
  try {
    const snapshots = yield firebase.firestore().collection('schools').get();

    const schools = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    yield put(fetchSchoolsSuccess(schools));
  } catch (error) {
    yield put(fetchSchoolsFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeEvery, CREATE_SCHOOL, createSchool);
  yield fork(takeEvery, DELETE_SCHOOL, deleteSchool);
  yield fork(takeLatest, FETCH_SCHOOL, fetchSchool);
  yield fork(takeLatest, FETCH_SCHOOLS, fetchSchools);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  fetchSchool,
  fetchSchools,
  rootSaga,
};
