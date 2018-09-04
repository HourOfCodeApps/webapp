import { createSelector } from 'reselect';

const selectAuthDomain = () => state => state.auth;

const selectUser = () => createSelector(
  selectAuthDomain(),
  substate => substate.user,
);

const selectStateInitLoaded = () => createSelector(
  selectAuthDomain(),
  substate => substate.stateInitLoaded,
);

export {
  selectAuthDomain,
  selectStateInitLoaded,
  selectUser,
};
