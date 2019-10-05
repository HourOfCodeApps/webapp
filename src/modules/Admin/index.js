import { combineReducers } from 'redux';

import Users,
{
  User,
  reducer as usersReducer,
  sagas as usersSagas,
} from './Users';

import Mentors,
{
  Mentor,
  reducer as mentorsReducer,
  sagas as mentorsSagas,
} from './Mentors';

import Teachers,
{
  reducer as teachersReducer,
  sagas as teachersSagas,
} from './Teachers';

import Timeslots,
{
  reducer as timeslotsReducer,
  sagas as timeslotsSagas,
} from './Timeslots';

export const reducer = combineReducers({
  mentors: mentorsReducer,
  teachers: teachersReducer,
  timeslots: timeslotsReducer,
  users: usersReducer,
});

export const sagas = [
  ...mentorsSagas,
  ...teachersSagas,
  ...timeslotsSagas,
  ...usersSagas,
];

export {
  Mentor,
  Mentors,
  Teachers,
  Timeslots,
  User,
  Users,
};
