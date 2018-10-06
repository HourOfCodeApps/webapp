import { createSelector } from 'reselect';

const selectSchoolsDomain = () => state => state.schools;

const selectSchool = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.school,
);

const selectSchoolFetching = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolFetching,
);

const selectSchoolFetchingError = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolFetchingError,
);

const selectSchools = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schools,
);

const selectSchoolsFetching = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolsFetching,
);

const selectSchoolsFetchingError = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolsFetchingError,
);

export {
  selectSchool,
  selectSchoolFetching,
  selectSchoolFetchingError,
  selectSchools,
  selectSchoolsDomain,
  selectSchoolsFetching,
  selectSchoolsFetchingError,
};
