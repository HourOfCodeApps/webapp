import { createSelector } from 'reselect';

const selectAuthDomain = () => state => state.auth;

const selectAuth = () => createSelector(
  selectAuthDomain(),
  substate => substate.auth,
);

const selectUser = () => createSelector(
  selectAuthDomain(),
  substate => substate.user,
);

const selectUserLoading = () => createSelector(
  selectAuthDomain(),
  substate => substate.userLoading,
);

const selectStateInitLoaded = () => createSelector(
  selectAuthDomain(),
  substate => substate.stateInitLoaded,
);

export {
  selectAuth,
  selectAuthDomain,
  selectStateInitLoaded,
  selectUser,
  selectUserLoading,
};
