// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';

import { takeLatest, fork, put } from 'redux-saga/effects';

// Application
import loadUserInfo, { loadUserSection } from 'shared/utils/helpers/loadUserInfo';

import {
  FETCH_MENTOR,
  FETCH_MENTOR_TIMESLOTS,
} from './constants';

import {
  fetchMentorFailure,
  fetchMentorSuccess,
  fetchMentorTimeslotsFailure,
  fetchMentorTimeslotsSuccess,
} from './actions';

function* fetchMentor({ payload: { id } }) {
  try {
    const user = yield loadUserInfo(id);

    if (!user.mentor) {
      throw new Error('Not Found');
    }

    yield put(fetchMentorSuccess(user));
  } catch (error) {
    yield put(fetchMentorFailure(error));
  }
}

function* fetchMentorTimeslots({ payload: { id } }) {
  try {
    const mentor = yield loadUserSection('mentors', id);

    if (!mentor) {
      throw new Error('Not Found');
    }

    const timeslotsSnap = yield firebase.firestore().collection('timeslots')
      .where('mentorId', '==', id)
      .get();

    const timeslots = timeslotsSnap.docs.map(d => ({
      ...d.data(),
      id: d.id,
      startTime: d.get('startTime').toDate(),
    }));

    yield put(fetchMentorTimeslotsSuccess(timeslots));
  } catch (error) {
    yield put(fetchMentorTimeslotsFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, FETCH_MENTOR, fetchMentor);
  yield fork(takeLatest, FETCH_MENTOR_TIMESLOTS, fetchMentorTimeslots);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  fetchMentor,
  fetchMentorTimeslots,
  rootSaga,
};
