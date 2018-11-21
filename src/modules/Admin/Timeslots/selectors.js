import { createSelector } from 'reselect';

const selectTimeslotsDomain = () => state => state.admin.timeslots;

const selectTimeslots = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslots,
);

const selectTimeslotsApproving = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotsApproving,
);

const selectTimeslotsApprovingError = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotsApprovingError,
);

const selectTimeslotDeleting = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotDeleting,
);

const selectTimeslotDeletingError = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotDeletingError,
);

const selectTimeslotsFetching = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotsFetching,
);

const selectTimeslotsFetchingError = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotsFetchingError,
);

const selectTimeslotsWaitForApproveCount = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotsWaitForApprove,
);

const selectTimeslotsWaitForMentorCount = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotsWaitForMentor,
);

const selectTimeslotsMentorWaitsForApproveCount = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotsMentorWaitsForApprove,
);

const selectTimeslotsHaveMentorCount = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotsHaveMentor,
);

export {
  selectTimeslots,
  selectTimeslotsApproving,
  selectTimeslotsApprovingError,
  selectTimeslotsDomain,
  selectTimeslotDeleting,
  selectTimeslotDeletingError,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
  selectTimeslotsWaitForApproveCount,
  selectTimeslotsWaitForMentorCount,
  selectTimeslotsMentorWaitsForApproveCount,
  selectTimeslotsHaveMentorCount,
};
