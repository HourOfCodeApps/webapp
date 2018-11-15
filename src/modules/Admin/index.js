import { combineReducers } from 'redux';

import Mentors,
{
  Mentor,
  reducer as mentorsReducer,
  sagas as mentorsSagas,
} from './Mentors';

import Timeslots,
{
  reducer as timeslotsReducer,
  sagas as timeslotsSagas,
} from './Timeslots';

export const reducer = combineReducers({
  mentors: mentorsReducer,
  timeslots: timeslotsReducer,
});

export const sagas = [
  ...mentorsSagas,
  ...timeslotsSagas,
];

export {
  Mentor,
  Mentors,
  Timeslots,
};
