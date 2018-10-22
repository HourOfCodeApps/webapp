import { DateTime } from 'luxon';

import {
  APPLY_TIMESLOT,
  APPLY_TIMESLOT_FAILURE,
  APPLY_TIMESLOT_SUCCESS,
  CANCEL_TIMESLOT,
  CANCEL_TIMESLOT_FAILURE,
  CANCEL_TIMESLOT_SUCCESS,
  FETCH_TIMESLOTS,
  FETCH_TIMESLOTS_FAILURE,
  FETCH_TIMESLOTS_SUCCESS,
  FETCH_MY_TIMESLOTS,
  FETCH_MY_TIMESLOTS_FAILURE,
  FETCH_MY_TIMESLOTS_SUCCESS,
} from './constants';

const initialState = {
  myTimeslots: [],
  myTimeslotsByDays: {},
  myTimeslotsBySchool: [],
  myTimeslotsFetching: false,
  myTimeslotsFetchingError: null,
  timeslotApplying: false,
  timeslotApplyingError: null,
  timeslotCanceling: false,
  timeslotCancelingError: null,
  timeslots: [],
  timeslotsByDays: {},
  timeslotsBySchool: [],
  timeslotsFetching: false,
  timeslotsFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APPLY_TIMESLOT:
      return {
        ...state,
        timeslotApplying: true,
        timeslotApplyingError: null,
      };

    case APPLY_TIMESLOT_FAILURE:
      return {
        ...state,
        timeslotApplying: false,
        timeslotApplyingError: action.payload.error,
      };

    case APPLY_TIMESLOT_SUCCESS:
      return {
        ...state,
        // timeslot: action.payload.timeslot,
        timeslotApplying: false,
      };

    case CANCEL_TIMESLOT:
      return {
        ...state,
        timeslotCanceling: true,
        timeslotCancelingError: null,
      };

    case CANCEL_TIMESLOT_FAILURE:
      return {
        ...state,
        timeslotCanceling: false,
        timeslotCancelingError: action.payload.error,
      };

    case CANCEL_TIMESLOT_SUCCESS:
      return {
        ...state,
        timeslotCanceling: false,
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

    case FETCH_TIMESLOTS_SUCCESS: {
      // const timeslotsByDays = action.payload.timeslots.slice()
      //   .reduce((acc, curr) => {
      //     const day = DateTime.fromJSDate(curr.startTime).toFormat('yyyy-MM-dd');

      //     const daySchools = (acc[day] || {});
      //     daySchools[curr.schoolId] = (daySchools[curr.schoolId] || []).concat(curr);

      //     // const dayValues = (acc[day] || []).concat(curr);
      //     return { ...acc, [day]: daySchools };
      //   }, {});

      const timeslotsBySchool = action.payload.timeslots.slice()
        .reduce((acc, curr) => {
          const schoolTimeslots = (acc[curr.schoolId] || []).concat(curr);

          // const dayValues = (acc[day] || []).concat(curr);
          return { ...acc, [curr.schoolId]: schoolTimeslots };
        }, {});

      return {
        ...state,
        timeslots: action.payload.timeslots.slice(),
        // timeslotsByDays,
        timeslotsBySchool,
        timeslotsFetching: false,
      };
    }

    case FETCH_MY_TIMESLOTS:
      return {
        ...state,
        myTimeslots: [],
        myTimeslotsFetching: true,
        myTimeslotsFetchingError: null,
      };

    case FETCH_MY_TIMESLOTS_FAILURE:
      return {
        ...state,
        myTimeslotsFetching: false,
        myTimeslotsFetchingError: action.payload.error,
      };

    case FETCH_MY_TIMESLOTS_SUCCESS: {
      const myTimeslotsByDays = action.payload.timeslots.slice()
        .reduce((acc, curr) => {
          const day = DateTime.fromJSDate(curr.startTime).toFormat('yyyy-MM-dd');

          const daySchools = (acc[day] || {});
          daySchools[curr.schoolId] = (daySchools[curr.schoolId] || []).concat(curr);

          return { ...acc, [day]: daySchools };
        }, {});

      const myTimeslotsBySchool = action.payload.timeslots.slice()
        .reduce((acc, curr) => {
          const schoolTimeslots = (acc[curr.schoolId] || []).concat(curr);

          // const dayValues = (acc[day] || []).concat(curr);
          return { ...acc, [curr.schoolId]: schoolTimeslots };
        }, {});

      return {
        ...state,
        myTimeslots: action.payload.timeslots.slice(),
        myTimeslotsBySchool,
        myTimeslotsByDays,
        myTimeslotsFetching: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
export { initialState };
