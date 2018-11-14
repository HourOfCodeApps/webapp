import { combineReducers } from 'redux';

import List,
{
  reducer as listReducer,
  sagas as listSagas,
} from './List';

export const reducer = combineReducers({
  list: listReducer,
});

export const sagas = [
  ...listSagas,
];

export default List;
