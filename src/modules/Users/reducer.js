import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from './constants';

const initialState = {
  users: [],
  usersFetching: false,
  usersFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        users: [],
        usersFetching: true,
        usersFetchingError: null,
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        usersFetching: false,
        usersFetchingError: action.payload.error,
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.users.slice(),
        usersFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
export { initialState };
