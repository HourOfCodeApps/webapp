import {
  FETCH_MENTORS,
  FETCH_MENTORS_FAILURE,
  FETCH_MENTORS_SUCCESS,
} from './constants';


/**
 * Fetch mentors action
 * @returns {{ type: String }}
 */
const fetchMentors = () => ({
  type: FETCH_MENTORS,
});

/**
 * Fetch mentors failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchMentorsFailure = error => ({
  type: FETCH_MENTORS_FAILURE,
  payload: { error },
});

/**
 * Fetch mentors success action
 * @param {Array} mentors
 * @returns {{ type: String, payload: { mentors } }}
 */
const fetchMentorsSuccess = mentors => ({
  type: FETCH_MENTORS_SUCCESS,
  payload: { mentors },
});

export {
  fetchMentors,
  fetchMentorsFailure,
  fetchMentorsSuccess,
};
