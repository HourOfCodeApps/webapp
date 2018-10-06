import { createSelector } from 'reselect';

const selectAuthDomain = () => state => state.auth;

const selectAuth = () => createSelector(
  selectAuthDomain(),
  substate => substate.auth,
);

const selectSigningIn = () => createSelector(
  selectAuthDomain(),
  substate => substate.signingIn,
);

const selectSigningInError = () => createSelector(
  selectAuthDomain(),
  substate => substate.signingInError,
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

const selectSigningUp = () => createSelector(
  selectAuthDomain(),
  substate => substate.signingUp,
);

const selectSigningUpError = () => createSelector(
  selectAuthDomain(),
  substate => substate.signingUpError,
);

export {
  selectAuth,
  selectAuthDomain,
  selectSigningIn,
  selectSigningInError,
  selectSigningUp,
  selectSigningUpError,
  selectStateInitLoaded,
  selectUser,
  selectUserLoading,
};
