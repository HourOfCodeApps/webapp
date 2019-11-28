import { createSelector } from 'reselect';

const selectReportsDomain = () => state => state.admin.reports;

const selectReports = () => createSelector(
  selectReportsDomain(),
  substate => substate.reports,
);

export {
  selectReports,
  selectReportsDomain,
};
