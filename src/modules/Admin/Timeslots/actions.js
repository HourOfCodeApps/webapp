import {
  APPROVE_TIMESLOTS,
  APPROVE_TIMESLOTS_FAILURE,
  APPROVE_TIMESLOTS_SUCCESS,
  DELETE_TIMESLOT,
  DELETE_TIMESLOT_FAILURE,
  DELETE_TIMESLOT_SUCCESS,
  FETCH_TIMESLOTS,
  FETCH_TIMESLOTS_FAILURE,
  FETCH_TIMESLOTS_SUCCESS,
} from './constants';

/**
 * Approve timeslots action
 * @param {String} teacherdId
 * @returns {{ type: String }}
 */
const approveTimeslots = timeslotId => ({
  type: APPROVE_TIMESLOTS,
  payload: { timeslotId },
});

/**
 * Approve timeslots failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const approveTimeslotsFailure = error => ({
  type: APPROVE_TIMESLOTS_FAILURE,
  payload: { error },
});

/**
 * Approve timeslots success action
 * @returns {{ type: String, payload: { timeslot } }}
 */
const approveTimeslotsSuccess = () => ({
  type: APPROVE_TIMESLOTS_SUCCESS,
});


/**
 * Delete timeslot action
 * @param {String} teacherdId
 * @returns {{ type: String }}
 */
const deleteTimeslot = timeslotId => ({
  type: DELETE_TIMESLOT,
  payload: { timeslotId },
});

/**
 * Delete timeslot failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const deleteTimeslotFailure = error => ({
  type: DELETE_TIMESLOT_FAILURE,
  payload: { error },
});

/**
 * Delete timeslot success action
 * @returns {{ type: String }}
 */
const deleteTimeslotSuccess = () => ({
  type: DELETE_TIMESLOT_SUCCESS,
});


/**
 * Fetch timeslots action
 * @returns {{ type: String }}
 */
const fetchTimeslots = (start = 0, limit = 10) => ({
  type: FETCH_TIMESLOTS,
  payload: { start, limit },
});

/**
 * Fetch timeslots failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchTimeslotsFailure = error => ({
  type: FETCH_TIMESLOTS_FAILURE,
  payload: { error },
});

/**
 * Fetch timeslots success action
 * @param {Array} timeslots
 * @returns {{ type: String, payload: { timeslots } }}
 */
const fetchTimeslotsSuccess = timeslots => ({
  type: FETCH_TIMESLOTS_SUCCESS,
  payload: { timeslots },
});

export {
  approveTimeslots,
  approveTimeslotsFailure,
  approveTimeslotsSuccess,
  deleteTimeslot,
  deleteTimeslotFailure,
  deleteTimeslotSuccess,
  fetchTimeslots,
  fetchTimeslotsFailure,
  fetchTimeslotsSuccess,
};
