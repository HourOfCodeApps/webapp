// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import {
  takeEvery, takeLatest, fork, put, select,
} from 'redux-saga/effects';
import pick from 'lodash/pick';

// Application
import { selectUser } from 'modules/Auth';

import {
  CREATE_TIMESLOT,
  DELETE_TIMESLOT,
  FETCH_TIMESLOTS,
} from './constants';

import {
  createTimeslotFailure,
  createTimeslotSuccess,
  fetchTimeslotsFailure,
  fetchTimeslotsSuccess,
  deleteTimeslotFailure,
  deleteTimeslotSuccess,
} from './actions';


function* createTimeslot({ payload: { data } }) {
  try {
    const user = yield select(selectUser());

    if (!user.teacher || !user.teacher.schoolId) {
      throw new Error('Oops');
    }

    const { schoolId } = user.teacher;

    const docRef = yield firebase.firestore().collection('timeslots')
      .add({
        ...pick(data, ['class', 'pupilsCount', 'notes']),
        schoolId,
        startTime: firebase.firestore.Timestamp.fromDate(data.startTime),
      });

    const createdSnapshot = yield docRef.get();

    const createdTimeslot = { ...createdSnapshot.data(), id: createdSnapshot.id };

    yield put(createTimeslotSuccess(createdTimeslot));
  } catch (error) {
    yield put(createTimeslotFailure(error));
  }
}

function* deleteTimeslot({ payload: { id } }) {
  try {
    yield firebase.firestore().collection('timeslots').doc(id).delete();

    yield put(deleteTimeslotSuccess());
  } catch (error) {
    yield put(deleteTimeslotFailure(error));
  }
}

/**
 * fetch timeslots without mentor
 */
function* fetchTimeslots() {
  try {
    const timeslotsSnaps = yield firebase.firestore().collection('timeslots')
      .where('mentorId', '==', null)
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
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeEvery, CREATE_TIMESLOT, createTimeslot);
  yield fork(takeEvery, DELETE_TIMESLOT, deleteTimeslot);
  yield fork(takeLatest, FETCH_TIMESLOTS, fetchTimeslots);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  createTimeslot,
  deleteTimeslot,
  fetchTimeslots,
  rootSaga,
};
