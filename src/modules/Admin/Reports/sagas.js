// Vendor
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';

import { eventChannel } from 'redux-saga';
import {
  takeLatest,
  fork,
  put,
  take,
  call,
  cancel,
  cancelled,
} from 'redux-saga/effects';

// Application
import { SUBSCRIBE_REPORTS, UNSUBSCRIBE_REPORTS, GENERATE_REPORT } from './constants';

import {
  reportsUpdated,
  generateReportFailure,
  generateReportSuccess,
} from './actions';

function createReportsSubscriptionChannel() {
  return eventChannel((emit) => {
    const unsubscribe = firebase
      .firestore()
      .collection('reports')
      .onSnapshot(
        snapshot => emit(snapshot),
        error => emit(error),
      );

    return unsubscribe;
  });
}

function* reportsSubsription() {
  const reportsSubscriptionChannel = yield call(
    createReportsSubscriptionChannel,
  );

  while (true) {
    try {
      const snapshot = yield take(reportsSubscriptionChannel);

      const reports = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        generationTime: doc.get('generationTime') ? doc.get('generationTime').toDate() : null,
      }));

      yield put(reportsUpdated(reports));
    } catch (err) {
      console.error('subsription error:', err);
    } finally {
      if (yield cancelled()) {
        reportsSubscriptionChannel.close();
      }
    }
  }
}

function* subscribeReports() {
  const reportsSubsriptionTask = yield fork(reportsSubsription);

  yield take(UNSUBSCRIBE_REPORTS);

  yield cancel(reportsSubsriptionTask);
}

function* genereateReport({ payload: { reportId } }) {
  try {
    const generateReportCallable = firebase.functions().httpsCallable('generateReport');
    yield generateReportCallable({ reportId });

    yield put(generateReportSuccess());
  } catch (error) {
    yield put(generateReportFailure(error));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
function* rootSaga() {
  yield fork(takeLatest, SUBSCRIBE_REPORTS, subscribeReports);
  yield fork(takeLatest, GENERATE_REPORT, genereateReport);
}

export default [rootSaga];
// Exports for testing
export { genereateReport, rootSaga, subscribeReports };
