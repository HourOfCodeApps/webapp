import { createSelector } from 'reselect';

const selectTeachersDomain = () => state => state.users.teachers;

const selectTeachers = () => createSelector(
  selectTeachersDomain(),
  substate => substate.teachers,
);

const selectTeachersApproving = () => createSelector(
  selectTeachersDomain(),
  substate => substate.teachersApproving,
);

const selectTeachersApprovingError = () => createSelector(
  selectTeachersDomain(),
  substate => substate.teachersApprovingError,
);

const selectTeachersFetching = () => createSelector(
  selectTeachersDomain(),
  substate => substate.teachersFetching,
);

const selectTeachersFetchingError = () => createSelector(
  selectTeachersDomain(),
  substate => substate.teachersFetchingError,
);

export {
  selectTeachers,
  selectTeachersApproving,
  selectTeachersApprovingError,
  selectTeachersDomain,
  selectTeachersFetching,
  selectTeachersFetchingError,
};
