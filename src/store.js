import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  // auth: authReducer,
  form: formReducer,
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
  // ...authSagas,
].map(sagaMiddleware.run);

export default store;
