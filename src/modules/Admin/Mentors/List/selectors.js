import { createSelector } from 'reselect';

const selectMentorsListDomain = () => state => state.admin.mentors.list;

const selectMentors = () => createSelector(
  selectMentorsListDomain(),
  substate => substate.mentors,
);

const selectMentorsFetching = () => createSelector(
  selectMentorsListDomain(),
  substate => substate.mentorsFetching,
);

const selectMentorsFetchingError = () => createSelector(
  selectMentorsListDomain(),
  substate => substate.mentorsFetchingError,
);

const selectApprovedTimeslotsCount = () => createSelector(
  selectMentorsListDomain(),
  substate => substate.approvedTimeslotsCount,
);

const selectAllTimeslotsCount = () => createSelector(
  selectMentorsListDomain(),
  substate => substate.allTimeslotsCount,
);

export {
  selectApprovedTimeslotsCount,
  selectAllTimeslotsCount,
  selectMentors,
  selectMentorsListDomain,
  selectMentorsFetching,
  selectMentorsFetchingError,
};
