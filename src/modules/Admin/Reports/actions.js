import {
  SUBSCRIBE_REPORTS,
  UNSUBSCRIBE_REPORTS,
  REPORTS_UPDATED,
  GENERATE_REPORT,
  GENERATE_REPORT_FAILURE,
  GENERATE_REPORT_SUCCESS,
} from './constants';

/**
 * Subscribe reports
 * @returns {{ type: String }}
 */
const subscribeReports = () => ({
  type: SUBSCRIBE_REPORTS,
});

/**
 * Unsubscribe reports
 * @returns {{ type: String }}
 */
const unsubscribeReports = () => ({
  type: UNSUBSCRIBE_REPORTS,
});

/**
 * Reports updated
 * @param {Array} reports
 * @returns {{ type: String }}
 */
const reportsUpdated = reports => ({
  type: REPORTS_UPDATED,
  payload: { reports },
});

/**
 * Generate report
 * @param {String} reportId
 * @returns {{ type: String, payload: { reportId: String } }}
 */
const generateReport = reportId => ({
  type: GENERATE_REPORT,
  payload: { reportId },
});

/**
 * Generate report failure
 * @param {Error} error
 * @returns {{ type: String, payload: { error: Error } }}
 */
const generateReportFailure = error => ({
  type: GENERATE_REPORT_FAILURE,
  payload: { error },
});

/**
 * Generate report success
 * @returns {{ type: String }}
 */
const generateReportSuccess = () => ({
  type: GENERATE_REPORT_SUCCESS,
});

export {
  subscribeReports,
  unsubscribeReports,
  reportsUpdated,
  generateReport,
  generateReportFailure,
  generateReportSuccess,
};
