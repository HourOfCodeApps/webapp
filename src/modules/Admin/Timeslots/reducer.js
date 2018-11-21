import {
  TIMESLOT_STATUS_NEEDS_APPROVE,
  TIMESLOT_STATUS_NEEDS_MENTOR,
  TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE,
  TIMESLOT_STATUS_HAS_MENTOR,
} from 'shared/constants/timeslots';

import {
  APPROVE_TIMESLOTS,
  APPROVE_TIMESLOTS_FAILURE,
  APPROVE_TIMESLOTS_SUCCESS,
  FETCH_TIMESLOTS,
  FETCH_TIMESLOTS_FAILURE,
  FETCH_TIMESLOTS_SUCCESS,
  DELETE_TIMESLOT,
  DELETE_TIMESLOT_FAILURE,
  DELETE_TIMESLOT_SUCCESS,
} from './constants';

const keyMapping = {
  [TIMESLOT_STATUS_NEEDS_APPROVE]: 'waitForApprove',
  [TIMESLOT_STATUS_NEEDS_MENTOR]: 'waitForMentor',
  [TIMESLOT_STATUS_MENTOR_NEEDS_APPROVE]: 'mentorWaitsForApprove',
  [TIMESLOT_STATUS_HAS_MENTOR]: 'haveMentor',
};

const initialState = {
  timeslotsWaitForApprove: 0,
  timeslotsWaitForMentor: 0,
  timeslotsMentorWaitsForApprove: 0,
  timeslotsHaveMentor: 0,
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

    case FETCH_TIMESLOTS_SUCCESS: {
      const counts = action.payload.timeslots.reduce((acc, t) => {
        const key = keyMapping[t.status];

        if (!key) return acc;

        return { ...acc, [key]: acc[key] + 1 };
      },
      {
        waitForApprove: 0, waitForMentor: 0, mentorWaitsForApprove: 0, haveMentor: 0,
      });

      return {
        ...state,
        timeslots: action.payload.timeslots.slice(),
        timeslotsFetching: false,
        timeslotsWaitForApprove: counts.waitForApprove,
        timeslotsWaitForMentor: counts.waitForMentor,
        timeslotsMentorWaitsForApprove: counts.mentorWaitsForApprove,
        timeslotsHaveMentor: counts.haveMentor,
      };
    }

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

    default:
      return state;
  }
};

export default reducer;
export { initialState };
