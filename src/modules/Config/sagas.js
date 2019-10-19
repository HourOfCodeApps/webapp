// Vendor
import firebase from 'firebase/app';
import 'firebase/remote-config';

import {
  takeLatest, fork, put,
} from 'redux-saga/effects';

// Application

import {
  FETCH_CONFIG,
} from './constants';

import {
  fetchConfigFailure,
  fetchConfigSuccess,
} from './actions';


function* fetchConfig() {
  try {
    const remoteConfig = firebase.remoteConfig();
    remoteConfig.settings = {
      minimumFetchIntervalMillis: 600000,
    };
    yield remoteConfig.fetchAndActivate();

    const config = {
      days: JSON.parse(remoteConfig.getString('days')),
      timeslotCreationEnabled: remoteConfig.getBoolean('timeslotCreationEnabled'),
      mentorSignupEnabled: remoteConfig.getBoolean('mentorSignupEnabled'),
      teacherSignupEnabled: remoteConfig.getBoolean('teacherSignupEnabled'),
    };

    yield put(fetchConfigSuccess(config));
  } catch (error) {
    yield put(fetchConfigFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, FETCH_CONFIG, fetchConfig);
}

export default [
  rootSaga,
];
// Exports for testing
export {
  fetchConfig,
  rootSaga,
};
