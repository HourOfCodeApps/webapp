import { createSelector } from 'reselect';

const selectScheduleDomain = () => state => state.schedule;

const selectTimeslotCreating = () => createSelector(
  selectScheduleDomain(),
  substate => substate.timeslotCreating,
);

const selectTimeslotCreatingError = () => createSelector(
  selectScheduleDomain(),
  substate => substate.timeslotCreatingError,
);

const selectTimeslotDeleting = () => createSelector(
  selectScheduleDomain(),
  substate => substate.timeslotDeleting,
);

const selectTimeslotDeletingError = () => createSelector(
  selectScheduleDomain(),
  substate => substate.timeslotDeletingError,
);

const selectTimeslots = () => createSelector(
  selectScheduleDomain(),
  substate => substate.timeslots,
);

const selectTimeslotsByDays = () => createSelector(
  selectScheduleDomain(),
  substate => substate.timeslotsByDays,
);

const selectTimeslotsFetching = () => createSelector(
  selectScheduleDomain(),
  substate => substate.timeslotsFetching,
);

const selectTimeslotsFetchingError = () => createSelector(
  selectScheduleDomain(),
  substate => substate.timeslotsFetchingError,
);

export {
  selectTimeslotCreating,
  selectTimeslotCreatingError,
  selectTimeslotDeleting,
  selectTimeslotDeletingError,
  selectTimeslots,
  selectTimeslotsByDays,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
  selectScheduleDomain,
};
