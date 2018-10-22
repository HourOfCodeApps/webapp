import { createSelector } from 'reselect';

const selectMentorScheduleDomain = () => state => state.mentorSchedule;

const selectTimeslotApplying = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotApplying,
);

const selectTimeslotApplyingError = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotApplyingError,
);

const selectTimeslotCanceling = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotCanceling,
);

const selectTimeslotCancelingError = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotCancelingError,
);

const selectTimeslots = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslots,
);

const selectTimeslotsByDays = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotsByDays,
);

const selectTimeslotsBySchool = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotsBySchool,
);

const selectTimeslotsFetching = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotsFetching,
);

const selectTimeslotsFetchingError = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.timeslotsFetchingError,
);

const selectMyTimeslots = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.myTimeslots,
);

const selectMyTimeslotsBySchool = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.myTimeslotsBySchool,
);

const selectMyTimeslotsFetching = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.myTimeslotsFetching,
);

const selectMyTimeslotsFetchingError = () => createSelector(
  selectMentorScheduleDomain(),
  substate => substate.myTimeslotsFetchingError,
);

export {
  selectTimeslotApplying,
  selectTimeslotApplyingError,
  selectTimeslotCanceling,
  selectTimeslotCancelingError,
  selectTimeslots,
  selectTimeslotsByDays,
  selectTimeslotsBySchool,
  selectTimeslotsFetching,
  selectTimeslotsFetchingError,
  selectMentorScheduleDomain,
  selectMyTimeslots,
  selectMyTimeslotsBySchool,
  selectMyTimeslotsFetching,
  selectMyTimeslotsFetchingError,
};
