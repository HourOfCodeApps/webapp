// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

import {
  takeEvery, takeLatest, fork, put,
} from 'redux-saga/effects';

// Application
import { loadUserProfile } from 'shared/utils/helpers/loadUserInfo';
import {
  TIMESLOT_STATUS_NEEDS_APPROVE,
  TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE,
  TIMESLOT_STATUS_HAS_MENTOR,
  TIMESLOT_STATUS_APPROVED,
  TIMESLOT_STATUS_NEEDS_MENTOR,
} from 'shared/constants/timeslots';

import {
  APPROVE_TIMESLOTS,
  FETCH_TIMESLOTS,
  DELETE_TIMESLOT,
} from './constants';

import {
  approveTimeslotsFailure,
  approveTimeslotsSuccess,
  fetchTimeslotsFailure,
  fetchTimeslotsSuccess,
  deleteTimeslotFailure,
  deleteTimeslotSuccess,
} from './actions';

function* approveTimeslot({ payload: { timeslotId } }) {
  try {
    const timeslotRef = firebase.firestore().collection('timeslots').doc(timeslotId);

    yield firebase.firestore().runTransaction(async (transaction) => {
      const doc = await transaction.get(timeslotRef);

      if (!doc.exists) {
        throw new Error('Timeslot does not exist!');
      }

      const docData = doc.data();

      let status;

      if (docData.status === TIMESLOT_STATUS_NEEDS_APPROVE) {
        status = TIMESLOT_STATUS_APPROVED;
      }

      if (docData.status === TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE) {
        status = TIMESLOT_STATUS_HAS_MENTOR;
      }

      return transaction.update(timeslotRef, { status });
    });

    yield put(approveTimeslotsSuccess());
  } catch (error) {
    yield put(approveTimeslotsFailure(error));
  }
}

function* deleteTimeslot({ payload: { timeslotId } }) {
  try {
    const deleteTimeslotsCallable = firebase.functions().httpsCallable('deleteTimeslot');
    yield deleteTimeslotsCallable(timeslotId);

    yield put(deleteTimeslotSuccess());
  } catch (error) {
    yield put(deleteTimeslotFailure(error));
  }
}

function* fetchTimeslots({ payload: { start = 0, limit = 10 } }) {
  try {
    const timeslotsSnaps = yield firebase.firestore().collection('timeslots')
      .orderBy('status', 'asc')
      .limit(10)
      .get();

    // const teachersIds = timeslotsSnaps.docs
    //   .slice(start, start + limit)
    //   .map(doc => doc.id);

    // const teachers = yield Promise.all(teachersIds.map(uid => loadUserInfo(uid)));
    const timeslots = timeslotsSnaps.docs
      .map(snap => ({ ...snap.data(), id: snap.id }))
      .map(timeslot => ({
        ...timeslot,
        startTime: timeslot.startTime.toDate(),
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

    yield put(fetchTimeslotsSuccess(timeslotsAggregated));
  } catch (error) {
    yield put(fetchTimeslotsFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, FETCH_TIMESLOTS, fetchTimeslots);
  yield fork(takeEvery, APPROVE_TIMESLOTS, approveTimeslot);
  yield fork(takeEvery, DELETE_TIMESLOT, deleteTimeslot);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  fetchTimeslots,
  rootSaga,
};
