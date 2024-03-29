// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

import {
  takeEvery, takeLatest, fork, put, select,
} from 'redux-saga/effects';
import pick from 'lodash/pick';

// Application
import config from 'config';
import { selectUser } from 'modules/Auth';
import { loadUserProfile } from 'shared/utils/helpers/loadUserInfo';

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
        mentorId: null,
      });

    const createdSnapshot = yield docRef.get();

    const createdTimeslot = { ...createdSnapshot.data(), id: createdSnapshot.id };

    yield put(createTimeslotSuccess(createdTimeslot));
  } catch (error) {
    yield put(createTimeslotFailure(error));
  }
}

function* deleteTimeslot({ payload: { id, reason } }) {
  try {
    const deleteTimeslotsCallable = firebase.app().functions(config.firebaseFunctionsRegion).httpsCallable('deleteTimeslot');
    yield deleteTimeslotsCallable({ timeslotId: id, reason });

    yield put(deleteTimeslotSuccess());
  } catch (error) {
    yield put(deleteTimeslotFailure(error));
  }
}

function* fetchTimeslots({ payload: { schoolId } }) {
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

    yield put(fetchTimeslotsSuccess(timeslotsAggregated));
  } catch (error) {
    yield put(fetchTimeslotsFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, CREATE_TIMESLOT, createTimeslot);
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
