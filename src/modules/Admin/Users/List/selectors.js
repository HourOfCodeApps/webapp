import { createSelector } from 'reselect';

const selectUsersListDomain = () => state => state.admin.users.list;

const selectUsers = () => createSelector(
  selectUsersListDomain(),
  substate => substate.users,
);

const selectUsersFetching = () => createSelector(
  selectUsersListDomain(),
  substate => substate.usersFetching,
);

const selectUsersFetchingError = () => createSelector(
  selectUsersListDomain(),
  substate => substate.usersFetchingError,
);

const selectApprovedTimeslotsCount = () => createSelector(
  selectUsersListDomain(),
  substate => substate.approvedTimeslotsCount,
);

const selectAllTimeslotsCount = () => createSelector(
  selectUsersListDomain(),
  substate => substate.allTimeslotsCount,
);

export {
  selectApprovedTimeslotsCount,
  selectAllTimeslotsCount,
  selectUsers,
  selectUsersListDomain,
  selectUsersFetching,
  selectUsersFetchingError,
};
