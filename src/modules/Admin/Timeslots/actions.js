import {
  APPROVE_TIMESLOTS,
  APPROVE_TIMESLOTS_FAILURE,
  APPROVE_TIMESLOTS_SUCCESS,
  FETCH_TIMESLOTS,
  FETCH_TIMESLOTS_FAILURE,
  FETCH_TIMESLOTS_SUCCESS,
} from './constants';

/**
 * Approve timeslots action
 * @param {Array|String} teacherdIds
 * @returns {{ type: String }}
 */
const approveTimeslots = timeslotIds => ({
  type: APPROVE_TIMESLOTS,
  payload: { timeslotIds: Array.isArray(timeslotIds) ? timeslotIds : [timeslotIds] },
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
  fetchTimeslots,
  fetchTimeslotsFailure,
  fetchTimeslotsSuccess,
};
