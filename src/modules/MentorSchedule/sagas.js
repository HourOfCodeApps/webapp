// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  takeEvery, takeLatest, fork, put, select,
} from 'redux-saga/effects';
import pick from 'lodash/pick';
import { DateTime } from 'luxon';

// Application
import { selectUser } from 'modules/Auth';

import {
  APPLY_TIMESLOT,
  CANCEL_TIMESLOT,
  FETCH_TIMESLOTS,
  FETCH_MY_TIMESLOTS,
} from './constants';

import {
  applyTimeslotFailure,
  applyTimeslotSuccess,
  fetchTimeslotsFailure,
  fetchTimeslotsSuccess,
  cancelTimeslotFailure,
  cancelTimeslotSuccess,
  fetchMyTimeslotsFailure,
  fetchMyTimeslotsSuccess,
} from './actions';


function* applyTimeslot({ payload: { timeslotId } }) {
  try {
    const firestore = firebase.firestore();

    const user = yield select(selectUser());

    const timeslotRef = firestore.collection('timeslots').doc(timeslotId);

    yield firestore.runTransaction(transaction => transaction.get(timeslotRef)
      .then((doc) => {
        if (!doc.exists) {
          throw new Error('Document does not exist!');
        }

        const docData = doc.data();

        if (docData.mentorId) {
          throw new Error('Timeslot already has a mentor');
        }

        // var newPopulation = sfDoc.data().population + 1;
        return transaction.update(timeslotRef, { mentorId: user.uid });
      }));

    const updatedSnapshot = yield timeslotRef.get();

    const updatedTimeslot = { ...updatedSnapshot.data(), id: updatedSnapshot.id };

    yield put(applyTimeslotSuccess(updatedTimeslot));
  } catch (error) {
    yield put(applyTimeslotFailure(error));
  }
}

function* cancelTimeslot({ payload: { id } }) {
  try {
    const firestore = firebase.firestore();

    const user = yield select(selectUser());

    const timeslotRef = firestore.collection('timeslots').doc(id);

    yield firestore.runTransaction(transaction => transaction.get(timeslotRef)
      .then((doc) => {
        if (!doc.exists) {
          throw new Error('Timeslot does not exist!');
        }

        const docData = doc.data();

        if (docData.mentorId !== user.uid) {
          throw new Error('Timeslot isn\t your');
        }

        // var newPopulation = sfDoc.data().population + 1;
        return transaction.update(timeslotRef, { mentorId: null });
      }));

    // const updatedSnapshot = yield timeslotRef.get();

    // const updatedTimeslot = { ...updatedSnapshot.data(), id: updatedSnapshot.id };


    // yield firebase.firestore().collection('timeslots').doc(id).cancel();

    yield put(cancelTimeslotSuccess());
  } catch (error) {
    yield put(cancelTimeslotFailure(error));
  }
}

/**
 * fetch timeslots without mentor
 */
function* fetchTimeslots({ payload }) {
  try {
    const from = firebase.firestore.Timestamp.fromDate(payload.from);
    //   DateTime.fromISO(date).set({
    //     hour: 0, minute: 0, second: 0, millisecond: 0,
    //   }).toJSDate(),
    // );
    const to = firebase.firestore.Timestamp.fromDate(payload.to);
    //   DateTime.fromISO(date).set({
    //     hour: 23, minute: 59, second: 59, millisecond: 999,
    //   }).toJSDate(),
    // );

    const timeslotsSnaps = yield firebase.firestore().collection('timeslots')
      .where('mentorId', '==', null)
      .where('startTime', '>=', from)
      .where('startTime', '<', to)
      .orderBy('startTime', 'asc')
      .orderBy('schoolId', 'asc')
      .get();

    const timeslots = timeslotsSnaps.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .map(timeslot => ({
        ...timeslot,
        startTime: timeslot.startTime.toDate(),
        // endTime: timeslot.endTime.toDate(),
      }));

    yield put(fetchTimeslotsSuccess(timeslots));
  } catch (error) {
    yield put(fetchTimeslotsFailure(error));
  }
}

/**
 * fetch mentor's timeslots
 */
function* fetchMyTimeslots() {
  try {
    const user = yield select(selectUser());

    const timeslotsSnaps = yield firebase.firestore().collection('timeslots')
      .where('mentorId', '==', user.uid)
      .orderBy('startTime', 'asc')
      .orderBy('schoolId', 'asc')
      .get();

    const timeslots = timeslotsSnaps.docs
      .map(doc => ({ ...doc.data(), id: doc.id }))
      .map(timeslot => ({
        ...timeslot,
        startTime: timeslot.startTime.toDate(),
      }));

    yield put(fetchMyTimeslotsSuccess(timeslots));
  } catch (error) {
    yield put(fetchMyTimeslotsFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeEvery, APPLY_TIMESLOT, applyTimeslot);
  yield fork(takeEvery, CANCEL_TIMESLOT, cancelTimeslot);
  yield fork(takeLatest, FETCH_TIMESLOTS, fetchTimeslots);
  yield fork(takeLatest, FETCH_MY_TIMESLOTS, fetchMyTimeslots);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  applyTimeslot,
  cancelTimeslot,
  fetchTimeslots,
  rootSaga,
};
