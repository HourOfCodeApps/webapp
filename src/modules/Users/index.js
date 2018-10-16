// import container from './container';

import { combineReducers } from 'redux';

import Teachers,
{
  reducer as teachersReducer,
  sagas as teachersSagas,
} from './Teachers';

// import sagas from './sagas';
// import reducer from './reducer';


export const reducer = combineReducers({
  teachers: teachersReducer,
});

export const sagas = [
  ...teachersSagas,
];

// export default container;
export {
  Teachers,
};
