// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  takeEvery, takeLatest, fork, put,
} from 'redux-saga/effects';

// Application
import {
  APPROVE_TEACHERS,
  FETCH_TEACHERS,
} from './constants';

import {
  approveTeachersFailure,
  approveTeachersSuccess,
  fetchTeachersFailure,
  fetchTeachersSuccess,
} from './actions';

function* approveTeachers({ payload: { teacherIds } }) {
  try {
    const collection = firebase.firestore().collection('users');
    const teachers = yield Promise.all(
      teacherIds.map(id => firebase.firestore().collection('users').doc(id).get()),
    );

    const existingTeachers = teachers.filter(t => t.exists);

    const batch = firebase.firestore().batch();
    existingTeachers.forEach(t => batch.update(collection.doc(t.id), { teacherApproved: true }));

    yield batch.commit();


    yield put(approveTeachersSuccess());
  } catch (error) {
    yield put(approveTeachersFailure(error));
  }
}

function* fetchTeachers() {
  try {
    const snapshots = yield firebase.firestore().collection('users')
      .where('roles.teacher', '==', true)
      .get();

    const users = snapshots.docs.map(doc => ({ ...doc.data(), uid: doc.id }));

    yield put(fetchTeachersSuccess(users));
  } catch (error) {
    yield put(fetchTeachersFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, FETCH_TEACHERS, fetchTeachers);
  yield fork(takeEvery, APPROVE_TEACHERS, approveTeachers);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  fetchTeachers,
  rootSaga,
};
