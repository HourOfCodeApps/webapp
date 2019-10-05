import { createSelector } from 'reselect';

const selectMentorsViewDomain = () => state => state.admin.mentors.view;

const selectMentor = () => createSelector(
  selectMentorsViewDomain(),
  substate => substate.mentor,
);

const selectMentorFetching = () => createSelector(
  selectMentorsViewDomain(),
  substate => substate.mentorFetching,
);

const selectMentorFetchingError = () => createSelector(
  selectMentorsViewDomain(),
  substate => substate.mentorFetchingError,
);

const selectMentorTimeslots = () => createSelector(
  selectMentorsViewDomain(),
  substate => substate.timeslots,
);

const selectMentorTimeslotsFetching = () => createSelector(
  selectMentorsViewDomain(),
  substate => substate.timeslotsFetching,
);

const selectMentorTimeslotsFetchingError = () => createSelector(
  selectMentorsViewDomain(),
  substate => substate.timeslotsFetchingError,
);

export {
  selectMentor,
  selectMentorFetching,
  selectMentorFetchingError,
  selectMentorsViewDomain,
  selectMentorTimeslots,
  selectMentorTimeslotsFetching,
  selectMentorTimeslotsFetchingError,
};
