import {
  FETCH_ME,
  FETCH_ME_FAILURE,
  FETCH_ME_SUCCESS,
  UPDATE_ME,
  UPDATE_ME_FAILURE,
  UPDATE_ME_SUCCESS,
} from './constants';

/**
 * Fetch me action
 * @returns {{ type: String }}
 */
const fetchMe = () => ({
  type: FETCH_ME,
});

/**
 * Fetch me failure action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchMeFailure = error => ({
  type: FETCH_ME_FAILURE,
  payload: { error },
});

/**
 * Fetch me success action
 * @param {Object} me
 * @returns {{ type: String, payload: { me } }}
 */
const fetchMeSuccess = me => ({
  type: FETCH_ME_SUCCESS,
  payload: { me },
});

/**
 * Update me action
 * @param {Object} userData
 * @returns {{ type: String, payload: { userData } }}
 */
const updateMe = userData => ({
  type: UPDATE_ME,
  payload: { userData },
});

/**
 * Update me failure action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const updateMeFailure = error => ({
  type: UPDATE_ME_FAILURE,
  payload: { error },
});

/**
 * Update me success action
 * @param {Object} me
 * @returns {{ type: String, payload: { me } }}
 */
const updateMeSuccess = me => ({
  type: UPDATE_ME_SUCCESS,
  payload: { me },
});

export {
  fetchMe,
  fetchMeFailure,
  fetchMeSuccess,
  updateMe,
  updateMeFailure,
  updateMeSuccess,
};
