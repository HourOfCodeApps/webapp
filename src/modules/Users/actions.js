import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from './constants';

/**
 * Fetch users action
 * @returns {{ type: String }}
 */
const fetchUsers = () => ({
  type: FETCH_USERS,
});

/**
 * Fetch users failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchUsersFailure = error => ({
  type: FETCH_USERS_FAILURE,
  payload: { error },
});

/**
 * Fetch users success action
 * @param {Array} users
 * @returns {{ type: String, payload: { users } }}
 */
const fetchUsersSuccess = users => ({
  type: FETCH_USERS_SUCCESS,
  payload: { users },
});

export {
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
};
