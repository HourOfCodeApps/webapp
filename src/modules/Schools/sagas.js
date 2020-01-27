// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  takeEvery, takeLatest, fork, put,
} from 'redux-saga/effects';

// Application
import { loadUserProfile } from 'shared/utils/helpers/loadUserInfo';

import {
  CREATE_SCHOOL,
  DELETE_SCHOOL,
  FETCH_SCHOOL,
  FETCH_SCHOOLS,
  UPDATE_SCHOOL,
  FETCH_SCHOOL_TIMESLOTS,
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
  updateSchoolSuccess,
  updateSchoolFailure,
  fetchSchoolTimeslotsFailure,
  fetchSchoolTimeslotsSuccess,
} from './actions';

function* createSchool({ payload: { data } }) {
  try {
    const docRef = yield firebase.firestore().collection('schools').add(data);

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

function* fetchSchoolTimeslots({ payload: { schoolId } }) {
  try {
    const timeslotsSnaps = yield firebase.firestore().collection('timeslots')
      .where('schoolId', '==', schoolId)
      .orderBy('startTime', 'asc')
      .get();

    const timeslots = timeslotsSnaps.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .map(timeslot => ({
        ...timeslot,
        startTime: timeslot.startTime.toDate(),
        // endTime: timeslot.endTime.toDate(),
      }));

    const mentorIds = timeslots.filter(t => t.mentorId).map(t => t.mentorId);

    const mentors = yield Promise.all(mentorIds.map(uid => loadUserProfile(uid)));

    const timeslotsAggregated = timeslots.map((t) => {
      if (!t.mentorId) {
        return t;
      }

      const mentor = mentors.find(m => m.uid === t.mentorId);
      return { ...t, mentor };
    });

    yield put(fetchSchoolTimeslotsSuccess(timeslotsAggregated));
  } catch (error) {
    yield put(fetchSchoolTimeslotsFailure(error));
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

function* updateSchool({ payload: { id, data } }) {
  try {
    const docRef = firebase.firestore().collection('schools').doc(id);

    yield docRef.set(data, { merge: true });

    const updatedSnapshot = yield docRef.get();

    const updatedSchool = { ...updatedSnapshot.data(), id: updatedSnapshot.id };

    yield put(updateSchoolSuccess(updatedSchool));
  } catch (error) {
    yield put(updateSchoolFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield takeEvery(CREATE_SCHOOL, createSchool);
  yield takeEvery(DELETE_SCHOOL, deleteSchool);
  yield takeLatest(FETCH_SCHOOL, fetchSchool);
  yield takeLatest(FETCH_SCHOOLS, fetchSchools);
  yield takeEvery(UPDATE_SCHOOL, updateSchool);
  yield takeLatest(FETCH_SCHOOL_TIMESLOTS, fetchSchoolTimeslots);
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
