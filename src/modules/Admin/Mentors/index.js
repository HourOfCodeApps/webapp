import { combineReducers } from 'redux';

import List,
{
  reducer as listReducer,
  sagas as listSagas,
} from './List';

import View,
{
  reducer as viewReducer,
  sagas as viewSagas,
} from './View';

export const reducer = combineReducers({
  list: listReducer,
  view: viewReducer,
});

export const sagas = [
  ...listSagas,
  ...viewSagas,
];

export default List;
export {
  View as Mentor,
};
