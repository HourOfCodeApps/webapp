import {
  FETCH_CONFIG,
  FETCH_CONFIG_FAILURE,
  FETCH_CONFIG_SUCCESS,
} from './constants';

/**
 * Fetch config action
 * @param {String} id
 * @returns {{ type: String }}
 */
const fetchConfig = id => ({
  type: FETCH_CONFIG,
  payload: { id },
});

/**
 * Fetch config failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchConfigFailure = error => ({
  type: FETCH_CONFIG_FAILURE,
  payload: { error },
});

/**
 * Fetch config success action
 * @param {Object} config
 * @returns {{ type: String, payload: { config } }}
 */
const fetchConfigSuccess = config => ({
  type: FETCH_CONFIG_SUCCESS,
  payload: { config },
});

export {
  fetchConfig,
  fetchConfigFailure,
  fetchConfigSuccess,
};
