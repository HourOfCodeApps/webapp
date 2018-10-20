import { createSelector } from 'reselect';

const selectSchoolsDomain = () => state => state.schools;

const selectSchool = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.school,
);

const selectSchoolCreating = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolCreating,
);

const selectSchoolCreatingError = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolCreatingError,
);

const selectSchoolDeleting = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolDeleting,
);

const selectSchoolDeletingError = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolDeletingError,
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

const selectSchoolsMap = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolsMap,
);

const selectSchoolUpdating = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolUpdating,
);

const selectSchoolUpdatingError = () => createSelector(
  selectSchoolsDomain(),
  substate => substate.schoolUpdatingError,
);

export {
  selectSchool,
  selectSchoolCreating,
  selectSchoolCreatingError,
  selectSchoolDeleting,
  selectSchoolDeletingError,
  selectSchoolFetching,
  selectSchoolFetchingError,
  selectSchools,
  selectSchoolsDomain,
  selectSchoolsFetching,
  selectSchoolsFetchingError,
  selectSchoolsMap,
  selectSchoolUpdating,
  selectSchoolUpdatingError,
};
