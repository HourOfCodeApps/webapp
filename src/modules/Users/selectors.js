import { createSelector } from 'reselect';

const selectUsersDomain = () => state => state.users;

const selectUsers = () => createSelector(
  selectUsersDomain(),
  substate => substate.users,
);

const selectUsersFetching = () => createSelector(
  selectUsersDomain(),
  substate => substate.usersFetching,
);

const selectUsersFetchingError = () => createSelector(
  selectUsersDomain(),
  substate => substate.usersFetchingError,
);

export {
  selectUsers,
  selectUsersDomain,
  selectUsersFetching,
  selectUsersFetchingError,
};
