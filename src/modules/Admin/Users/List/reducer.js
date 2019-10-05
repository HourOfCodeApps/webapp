import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from './constants';

const initialState = {
  approvedTimeslotsCount: 0,
  allTimeslotsCount: 0,
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

    case FETCH_USERS_SUCCESS: {
      // const { all, approved } = action.payload.users.reduce((acc, m) => ({
      //   all: acc.all + (m.mentor.timeslotsCount || 0),
      //   approved: acc.approved + (m.mentor.approvedTimeslotsCount || 0),
      // }),
      // { all: 0, approved: 0 });

      console.log(action.payload);
      return {
        ...state,
        users: action.payload.users.slice(),
        usersFetching: false,
        // approvedTimeslotsCount: approved,
        // allTimeslotsCount: all,
      };
    }

    default:
      return state;
  }
};

export default reducer;
export { initialState };
