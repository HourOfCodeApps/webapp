// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';

import { takeLatest, fork, put } from 'redux-saga/effects';

// Application
import loadUserInfo from 'shared/utils/helpers/loadUserInfo';

import {
  FETCH_MENTORS,
} from './constants';

import {
  fetchMentorsFailure,
  fetchMentorsSuccess,
} from './actions';

function* fetchMentors() {
  try {
    const mentorsSnap = yield firebase.firestore().collection('mentors').get();

    const mentorsIds = mentorsSnap.docs
      // .slice(start, start + limit)
      .map(doc => doc.id);

    const mentors = yield Promise.all(mentorsIds.map(uid => loadUserInfo(uid)));

    const mentorsSorted = mentors
      .map(mentor => ({
        ...mentor,
        mentor: {
          ...mentor.mentor,
          approvedTimeslotsCount: mentor.mentor.approvedTimeslotsCount || 0,
          timeslotsCount: mentor.mentor.timeslotsCount || 0,
        },
      }))
      .sort((a, b) => a.mentor.timeslotsCount - b.mentor.timeslotsCount);

    yield put(fetchMentorsSuccess(mentorsSorted));
  } catch (error) {
    yield put(fetchMentorsFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield takeLatest(FETCH_MENTORS, fetchMentors);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  fetchMentors,
  rootSaga,
};
