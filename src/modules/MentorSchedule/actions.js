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

/**
 * Apply timeslot action
 * @param {String} timeslotId
 * @returns {{ type: String, payload: { timeslotId } }}
 */
const applyTimeslot = timeslotId => ({
  type: APPLY_TIMESLOT,
  payload: { timeslotId },
});

/**
 * Apply timeslot failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const applyTimeslotFailure = error => ({
  type: APPLY_TIMESLOT_FAILURE,
  payload: { error },
});

/**
 * Apply timeslots success action
 * @param {Object} timeslot
 * @returns {{ type: String, payload: { timeslot } }}
 */
const applyTimeslotSuccess = timeslot => ({
  type: APPLY_TIMESLOT_SUCCESS,
  payload: { timeslot },
});

/**
 * Cancel timeslot action
 * @param {String} id timeslot id to delete
 * @returns {{ type: String, payload: { id } }}
 */
const cancelTimeslot = id => ({
  type: CANCEL_TIMESLOT,
  payload: { id },
});

/**
 * Create timeslot failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const cancelTimeslotFailure = error => ({
  type: CANCEL_TIMESLOT_FAILURE,
  payload: { error },
});

/**
 * Cancel timeslot success action
 * @returns {{ type: String }}
 */
const cancelTimeslotSuccess = () => ({
  type: CANCEL_TIMESLOT_SUCCESS,
});

/**
 * Fetch timeslots action
 * @param {String} date e.g. 2018-01-15
 * @returns {{ type: String }}
 */
const fetchTimeslots = (from, to) => ({
  type: FETCH_TIMESLOTS,
  payload: { from, to },
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

/**
 * Fetch timeslots action
 * @returns {{ type: String }}
 */
const fetchMyTimeslots = () => ({
  type: FETCH_MY_TIMESLOTS,
});

/**
 * Fetch timeslots failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchMyTimeslotsFailure = error => ({
  type: FETCH_MY_TIMESLOTS_FAILURE,
  payload: { error },
});

/**
 * Fetch timeslots success action
 * @param {Array} timeslots
 * @returns {{ type: String, payload: { timeslots } }}
 */
const fetchMyTimeslotsSuccess = timeslots => ({
  type: FETCH_MY_TIMESLOTS_SUCCESS,
  payload: { timeslots },
});

export {
  applyTimeslot,
  applyTimeslotFailure,
  applyTimeslotSuccess,
  cancelTimeslot,
  cancelTimeslotFailure,
  cancelTimeslotSuccess,
  fetchTimeslots,
  fetchTimeslotsFailure,
  fetchTimeslotsSuccess,
  fetchMyTimeslots,
  fetchMyTimeslotsFailure,
  fetchMyTimeslotsSuccess,
};
