import {
  FETCH_MENTOR,
  FETCH_MENTOR_FAILURE,
  FETCH_MENTOR_SUCCESS,
  FETCH_MENTOR_TIMESLOTS,
  FETCH_MENTOR_TIMESLOTS_FAILURE,
  FETCH_MENTOR_TIMESLOTS_SUCCESS,
} from './constants';

/**
 * Fetch mentor action
 * @param {String} id
 * @returns {{ type: String }}
 */
const fetchMentor = id => ({
  type: FETCH_MENTOR,
  payload: { id },
});

/**
 * Fetch mentor failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchMentorFailure = error => ({
  type: FETCH_MENTOR_FAILURE,
  payload: { error },
});

/**
 * Fetch mentor success action
 * @param {Object} mentor
 * @returns {{ type: String, payload: { mentor } }}
 */
const fetchMentorSuccess = mentor => ({
  type: FETCH_MENTOR_SUCCESS,
  payload: { mentor },
});

/**
 * Fetch mentor timeslots action
 * @param {String} id
 * @returns {{ type: String }}
 */
const fetchMentorTimeslots = id => ({
  type: FETCH_MENTOR_TIMESLOTS,
  payload: { id },
});

/**
 * Fetch mentor timeslots failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchMentorTimeslotsFailure = error => ({
  type: FETCH_MENTOR_TIMESLOTS_FAILURE,
  payload: { error },
});

/**
 * Fetch mentor timeslots success action
 * @param {Array} timeslots
 * @returns {{ type: String, payload: { timeslots } }}
 */
const fetchMentorTimeslotsSuccess = timeslots => ({
  type: FETCH_MENTOR_TIMESLOTS_SUCCESS,
  payload: { timeslots },
});

export {
  fetchMentor,
  fetchMentorFailure,
  fetchMentorSuccess,
  fetchMentorTimeslots,
  fetchMentorTimeslotsFailure,
  fetchMentorTimeslotsSuccess,
};
