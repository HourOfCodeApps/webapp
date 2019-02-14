// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  takeEvery, takeLatest, fork, put,
} from 'redux-saga/effects';

import loadUserInfo from 'shared/utils/helpers/loadUserInfo';

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
    const collection = firebase.firestore().collection('teachers');
    const teachers = yield Promise.all(
      teacherIds.map(id => firebase.firestore().collection('teachers').doc(id).get()),
    );

    const existingTeachers = teachers.filter(t => t.exists);

    const batch = firebase.firestore().batch();
    existingTeachers.forEach(t => batch.update(collection.doc(t.id), { isApproved: true }));

    yield batch.commit();


    yield put(approveTeachersSuccess());
  } catch (error) {
    yield put(approveTeachersFailure(error));
  }
}

function* fetchTeachers() {
  try {
    const teachersSnaps = yield firebase.firestore().collection('teachers')
      .orderBy('isApproved', 'asc')
      .get();

    const teachersIds = teachersSnaps.docs
      // .slice(start, start + limit)
      .map(doc => doc.id);

    const teachers = yield Promise.all(teachersIds.map(uid => loadUserInfo(uid)));

    yield put(fetchTeachersSuccess(teachers));
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
