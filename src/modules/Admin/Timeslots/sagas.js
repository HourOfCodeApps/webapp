// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  takeEvery, takeLatest, fork, put,
} from 'redux-saga/effects';

// Application
import {
  APPROVE_TIMESLOTS,
  FETCH_TIMESLOTS,
} from './constants';

import {
  approveTimeslotsFailure,
  approveTimeslotsSuccess,
  fetchTimeslotsFailure,
  fetchTimeslotsSuccess,
} from './actions';

function* approveTimeslots({ payload: { timeslotIds } }) {
  try {
    const collection = firebase.firestore().collection('timeslots');
    const timeslots = yield Promise.all(
      timeslotIds.map(id => firebase.firestore().collection('timeslots').doc(id).get()),
    );

    const existingTimeslots = timeslots.filter(t => t.exists);

    const batch = firebase.firestore().batch();
    existingTimeslots.forEach(t => batch.update(collection.doc(t.id), { isApproved: true }));

    yield batch.commit();


    yield put(approveTimeslotsSuccess());
  } catch (error) {
    yield put(approveTimeslotsFailure(error));
  }
}

function* fetchTimeslots({ payload: { start = 0, limit = 10 } }) {
  try {
    const timeslotsSnaps = yield firebase.firestore().collection('timeslots')
      .orderBy('isApproved', 'asc')
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

    yield put(fetchTimeslotsSuccess(timeslots));
  } catch (error) {
    yield put(fetchTimeslotsFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, FETCH_TIMESLOTS, fetchTimeslots);
  yield fork(takeEvery, APPROVE_TIMESLOTS, approveTimeslots);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  fetchTimeslots,
  rootSaga,
};
