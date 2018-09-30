import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as formReducer } from 'redux-form';

import { reducer as authReducer, sagas as authSagas } from 'modules/Auth';
import { reducer as usersReducer, sagas as usersSagas } from 'modules/Users';
import { reducer as schoolsReducer, sagas as schoolsSagas } from 'modules/Schools';

const reducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  schools: schoolsReducer,
  users: usersReducer,
});

// ToDo: skip if prod
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // eslint-disable-line

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware),
  ),
);

[
  ...authSagas,
  ...schoolsSagas,
  ...usersSagas,
].map(sagaMiddleware.run);

export default store;
