import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as formReducer } from 'redux-form';

import { reducer as authReducer, sagas as authSagas } from 'modules/Auth';
import { reducer as mentorScheduleReducer, sagas as mentorScheduleSagas } from 'modules/MentorSchedule';
// import { reducer as usersReducer, sagas as usersSagas } from 'modules/Users';
import { reducer as schoolsReducer, sagas as schoolsSagas } from 'modules/Schools';
import { reducer as scheduleReducer, sagas as scheduleSagas } from 'modules/Schedule';
import { reducer as profileReducer, sagas as profileSagas } from 'modules/Profile';
import { reducer as adminReducer, sagas as adminSagas } from 'modules/Admin';

const reducer = combineReducers({
  admin: adminReducer,
  auth: authReducer,
  form: formReducer,
  mentorSchedule: mentorScheduleReducer,
  profile: profileReducer,
  schedule: scheduleReducer,
  schools: schoolsReducer,
  // users: usersReducer,
});

let composeEnhancers = compose;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // eslint-disable-line
}

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
  ),
);

[
  ...adminSagas,
  ...authSagas,
  ...mentorScheduleSagas,
  ...scheduleSagas,
  ...schoolsSagas,
  // ...usersSagas,
  ...profileSagas,
].map(sagaMiddleware.run);

export default store;
