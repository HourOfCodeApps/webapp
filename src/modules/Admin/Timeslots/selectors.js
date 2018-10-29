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

const selectTimeslotsFetching = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotsFetching,
);

const selectTimeslotsFetchingError = () => createSelector(
  selectTimeslotsDomain(),
  substate => substate.timeslotsFetchingError,
);

export {
  selectTimeslots,
  selectTimeslotsApproving,
  selectTimeslotsApprovingError,
  selectTimeslotsDomain,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
};
