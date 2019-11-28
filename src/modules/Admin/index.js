import { combineReducers } from 'redux';

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

import Reports,
{
  reducer as reportsReducer,
  sagas as reportsSagas,
} from './Reports';

export const reducer = combineReducers({
  mentors: mentorsReducer,
  teachers: teachersReducer,
  timeslots: timeslotsReducer,
  reports: reportsReducer,
});

export const sagas = [
  ...mentorsSagas,
  ...teachersSagas,
  ...timeslotsSagas,
  ...reportsSagas,
];

export {
  Mentor,
  Mentors,
  Teachers,
  Timeslots,
  Reports,
};
