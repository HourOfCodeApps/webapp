// Vendor
// import firebase from 'firebase/app';
// import 'firebase/firestore';
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
    const config = {
      days: ['2018-12-03', '2018-12-04', '2018-12-05', '2018-12-06', '2018-12-07', '2018-12-08'],
      // days: ['2019-12-09', '2019-12-10', '2019-12-11', '2019-12-12', '2019-12-13', '2019-12-14'],
      timeslotCreationEnabled: true,
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
