import { createSelector } from 'reselect';

const selectMentorScheduleDomain = () => state => state.mentorSchedule;

const selectTimeslotCreating = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotCreating,
);

const selectTimeslotCreatingError = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotCreatingError,
);

const selectTimeslotDeleting = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotDeleting,
);

const selectTimeslotDeletingError = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotDeletingError,
);

const selectTimeslots = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslots,
);

const selectTimeslotsByDays = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotsByDays,
);

const selectTimeslotsFetching = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotsFetching,
);

const selectTimeslotsFetchingError = () => createSelector(
  selectMentorScheduleDomain(),
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
  selectMentorScheduleDomain,
};
