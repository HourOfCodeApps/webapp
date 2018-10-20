import {
  FETCH_ME,
  FETCH_ME_FAILURE,
  FETCH_ME_SUCCESS,
  UPDATE_ME,
  UPDATE_ME_FAILURE,
  UPDATE_ME_SUCCESS,
} from './constants';

const fetchMe = () => ({
  type: FETCH_ME,
});

/**
 * Dispatch when loading user caused error
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchMeFailure = error => ({
  type: FETCH_ME_FAILURE,
  payload: { error },
});

/**
 * Dispatch when user data loaded successfully
 * @param {Object} me
 * @returns {{ type: String, payload: { me } }}
 */
const fetchMeSuccess = me => ({
  type: FETCH_ME_SUCCESS,
  payload: { me },
});


const updateMe = userData => ({
  type: UPDATE_ME,
  payload: { userData },
});

/**
 * Dispatch when loading user caused error
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const updateMeFailure = error => ({
  type: UPDATE_ME_FAILURE,
  payload: { error },
});

/**
 * Dispatch when user data loaded successfully
 * @param {Object} user
 * @returns {{ type: String, payload: { user } }}
 */
const updateMeSuccess = user => ({
  type: UPDATE_ME_SUCCESS,
  payload: { user },
});


export {
  fetchMe,
  fetchMeFailure,
  fetchMeSuccess,
  updateMe,
  updateMeFailure,
  updateMeSuccess,
};
