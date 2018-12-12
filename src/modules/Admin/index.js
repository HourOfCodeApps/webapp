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

export const reducer = combineReducers({
  mentors: mentorsReducer,
  teachers: teachersReducer,
  timeslots: timeslotsReducer,
});

export const sagas = [
  ...mentorsSagas,
  ...teachersSagas,
  ...timeslotsSagas,
];

export {
  Mentor,
  Mentors,
  Teachers,
  Timeslots,
};
