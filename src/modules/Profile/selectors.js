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

const selectMeUpdating = () => createSelector(
  selectProfileDomain(),
  substate => substate.meUpdating,
);

const selectMeUpdatingError = () => createSelector(
  selectProfileDomain(),
  substate => substate.meUpdatingError,
);

export {
  selectMe,
  selectMeFetching,
  selectMeFetchingError,
  selectMeUpdating,
  selectMeUpdatingError,
  selectProfileDomain,
};
