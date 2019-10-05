// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';

import { takeLatest, fork, put } from 'redux-saga/effects';

// Application
// import loadUserInfo from 'shared/utils/helpers/loadUserInfo';

import {
  FETCH_USERS,
} from './constants';

import {
  fetchUsersFailure,
  fetchUsersSuccess,
} from './actions';

function* fetchUsers() {
  try {
    const getUsers = firebase.functions().httpsCallable('getUsers');
    const users = yield getUsers({});

    // const mentorsIds = mentorsSnap.docs
    //   // .slice(start, start + limit)
    //   .map(doc => doc.id);

    // const mentors = yield Promise.all(mentorsIds.map(uid => loadUserInfo(uid)));

    // const mentorsSorted = mentors
    //   .map(mentor => ({
    //     ...mentor,
    //     mentor: {
    //       ...mentor.mentor,
    //       approvedTimeslotsCount: mentor.mentor.approvedTimeslotsCount || 0,
    //       timeslotsCount: mentor.mentor.timeslotsCount || 0,
    //     },
    //   }))
    //   .sort((a, b) => a.mentor.timeslotsCount - b.mentor.timeslotsCount);

    yield put(fetchUsersSuccess(users.data));
  } catch (error) {
    yield put(fetchUsersFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, FETCH_USERS, fetchUsers);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  fetchUsers,
  rootSaga,
};
