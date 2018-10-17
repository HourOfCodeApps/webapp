import { createSelector } from 'reselect';

const selectScheduleDomain = () => state => state.schedule;

const selectTimeslots = () => createSelector(
  selectScheduleDomain(),
  substate => substate.timeslots,
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
  selectTimeslots,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
  selectScheduleDomain,
};
