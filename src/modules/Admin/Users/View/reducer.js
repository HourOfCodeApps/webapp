import {
  FETCH_MENTOR,
  FETCH_MENTOR_FAILURE,
  FETCH_MENTOR_SUCCESS,
  FETCH_MENTOR_TIMESLOTS,
  FETCH_MENTOR_TIMESLOTS_FAILURE,
  FETCH_MENTOR_TIMESLOTS_SUCCESS,
} from './constants';

const initialState = {
  mentor: null,
  mentorFetching: false,
  mentorFetchingError: null,
  timeslots: [],
  timeslotsFetching: false,
  timeslotsFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENTOR:
      return {
        ...state,
        mentorFetching: true,
        mentorFetchingError: null,
      };

    case FETCH_MENTOR_FAILURE:
      return {
        ...state,
        mentorFetching: false,
        mentorFetchingError: action.payload.error,
      };

    case FETCH_MENTOR_SUCCESS:
      return {
        ...state,
        mentor: action.payload.mentor,
        mentorFetching: false,
      };

    case FETCH_MENTOR_TIMESLOTS:
      return {
        ...state,
        timeslots: [],
        timeslotsFetching: true,
        timeslotsFetchingError: null,
      };

    case FETCH_MENTOR_TIMESLOTS_FAILURE:
      return {
        ...state,
        timeslotsFetching: false,
        timeslotsFetchingError: action.payload.error,
      };

    case FETCH_MENTOR_TIMESLOTS_SUCCESS:
      return {
        ...state,
        timeslots: action.payload.timeslots.slice(),
        timeslotsFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
export { initialState };
