import {
  APPROVE_TIMESLOTS,
  APPROVE_TIMESLOTS_FAILURE,
  APPROVE_TIMESLOTS_SUCCESS,
  FETCH_TIMESLOTS,
  FETCH_TIMESLOTS_FAILURE,
  FETCH_TIMESLOTS_SUCCESS,
} from './constants';

const initialState = {
  timeslots: [],
  timeslotsApproving: false,
  timeslotsApprovingError: null,
  timeslotsFetching: false,
  timeslotsFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APPROVE_TIMESLOTS:
      return {
        ...state,
        timeslotsApproving: true,
        timeslotsApprovingError: null,
      };

    case APPROVE_TIMESLOTS_FAILURE:
      return {
        ...state,
        timeslotsApproving: false,
        timeslotsApprovingError: action.payload.error,
      };

    case APPROVE_TIMESLOTS_SUCCESS:
      return {
        ...state,
        timeslotsApproving: false,
      };

    case FETCH_TIMESLOTS:
      return {
        ...state,
        timeslots: [],
        timeslotsFetching: true,
        timeslotsFetchingError: null,
      };

    case FETCH_TIMESLOTS_FAILURE:
      return {
        ...state,
        timeslotsFetching: false,
        timeslotsFetchingError: action.payload.error,
      };

    case FETCH_TIMESLOTS_SUCCESS:
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
