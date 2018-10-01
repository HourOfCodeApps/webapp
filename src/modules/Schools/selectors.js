import { createSelector } from 'reselect';

const selectSchoolsDomain = () => state => state.schools;

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
  selectSchools,
  selectSchoolsDomain,
  selectSchoolsFetching,
  selectSchoolsFetchingError,
};
