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

/**
 * Create timeslot action
 * @param {Object} data timeslot data
 * @returns {{ type: String, payload: { data } }}
 */
const createTimeslot = data => ({
  type: CREATE_TIMESLOT,
  payload: { data },
});

/**
 * Create timeslot failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const createTimeslotFailure = error => ({
  type: CREATE_TIMESLOT_FAILURE,
  payload: { error },
});

/**
 * Create timeslots success action
 * @param {Object} timeslot
 * @returns {{ type: String, payload: { timeslot } }}
 */
const createTimeslotSuccess = timeslot => ({
  type: CREATE_TIMESLOT_SUCCESS,
  payload: { timeslot },
});

/**
 * Delete timeslot action
 * @param {String} id timeslot id to delete
 * @returns {{ type: String, payload: { id } }}
 */
const deleteTimeslot = id => ({
  type: DELETE_TIMESLOT,
  payload: { id },
});

/**
 * Create timeslot failed action
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
 * @param {String} schoolId
 * @returns {{ type: String }}
 */
const fetchTimeslots = schoolId => ({
  type: FETCH_TIMESLOTS,
  payload: { schoolId },
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
  createTimeslot,
  createTimeslotFailure,
  createTimeslotSuccess,
  deleteTimeslot,
  deleteTimeslotFailure,
  deleteTimeslotSuccess,
  fetchTimeslots,
  fetchTimeslotsFailure,
  fetchTimeslotsSuccess,
};
