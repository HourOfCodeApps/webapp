// import container from './container';

import { combineReducers } from 'redux';

import Timeslots,
{
  reducer as timeslotsReducer,
  sagas as timeslotsSagas,
} from './Timeslots';

// import sagas from './sagas';
// import reducer from './reducer';


export const reducer = combineReducers({
  timeslots: timeslotsReducer,
});

export const sagas = [
  ...timeslotsSagas,
];

// export default container;
export {
  Timeslots,
};
