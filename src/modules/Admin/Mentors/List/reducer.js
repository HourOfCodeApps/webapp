import {
  FETCH_MENTORS,
  FETCH_MENTORS_FAILURE,
  FETCH_MENTORS_SUCCESS,
} from './constants';

const initialState = {
  mentors: [],
  mentorsFetching: false,
  mentorsFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENTORS:
      return {
        ...state,
        mentors: [],
        mentorsFetching: true,
        mentorsFetchingError: null,
      };

    case FETCH_MENTORS_FAILURE:
      return {
        ...state,
        mentorsFetching: false,
        mentorsFetchingError: action.payload.error,
      };

    case FETCH_MENTORS_SUCCESS:
      return {
        ...state,
        mentors: action.payload.mentors.slice(),
        mentorsFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
export { initialState };
