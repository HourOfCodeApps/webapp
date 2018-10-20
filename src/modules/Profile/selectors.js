import { createSelector } from 'reselect';

const selectProfileDomain = () => state => state.profile;

const selectMe = () => createSelector(
  selectProfileDomain(),
  substate => substate.me,
);

const selectMeFetching = () => createSelector(
  selectProfileDomain(),
  substate => substate.meFetching,
);

const selectMeFetchingError = () => createSelector(
  selectProfileDomain(),
  substate => substate.meFetchingError,
);

export {
  selectMe,
  selectMeFetching,
  selectMeFetchingError,
  selectProfileDomain,
};
