import { DateTime } from 'luxon';

import {
  CREATE_TIMESLOT,
  CREATE_TIMESLOT_FAILURE,
  CREATE_TIMESLOT_SUCCESS,
  DELETE_TIMESLOT,
  DELETE_TIMESLOT_FAILURE,
  DELETE_TIMESLOT_SUCCESS,
  FETCH_TIMESLOTS,
  FETCH_TIMESLOTS_FAILURE,
  FETCH_TIMESLOTS_SUCCESS,
} from './constants';

const initialState = {
  timeslotCreating: false,
  timeslotCreatingError: null,
  timeslotDeleting: false,
  timeslotDeletingError: null,
  timeslots: [],
  timeslotsByDays: {},
  timeslotsFetching: false,
  timeslotsFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TIMESLOT:
      return {
        ...state,
        timeslotCreating: true,
        timeslotCreatingError: null,
      };

    case CREATE_TIMESLOT_FAILURE:
      return {
        ...state,
        timeslotCreating: false,
        timeslotCreatingError: action.payload.error,
      };

    case CREATE_TIMESLOT_SUCCESS:
      return {
        ...state,
        timeslot: action.payload.timeslot,
        timeslotCreating: false,
      };

    case DELETE_TIMESLOT:
      return {
        ...state,
        timeslotDeleting: true,
        timeslotDeletingError: null,
      };

    case DELETE_TIMESLOT_FAILURE:
      return {
        ...state,
        timeslotDeleting: false,
        timeslotDeletingError: action.payload.error,
      };

    case DELETE_TIMESLOT_SUCCESS:
      return {
        ...state,
        timeslotDeleting: false,
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
        timeslotsByDays: action.payload.timeslots.slice()
          .reduce((acc, curr) => {
            const day = DateTime.fromJSDate(curr.startTime).toFormat('yyyy-MM-dd');
            const dayValues = (acc[day] || []).concat(curr);
            return { ...acc, [day]: dayValues };
          }, {}),
        timeslotsFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
export { initialState };
