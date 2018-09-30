import {
  FETCH_SCHOOLS,
  FETCH_SCHOOLS_FAILURE,
  FETCH_SCHOOLS_SUCCESS,
} from './constants';

/**
 * Fetch schools action
 * @returns {{ type: String }}
 */
const fetchSchools = () => ({
  type: FETCH_SCHOOLS,
});

/**
 * Fetch schools failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchSchoolsFailure = error => ({
  type: FETCH_SCHOOLS_FAILURE,
  payload: { error },
});

/**
 * Fetch schools success action
 * @param {Array} schools
 * @returns {{ type: String, payload: { schools } }}
 */
const fetchSchoolsSuccess = schools => ({
  type: FETCH_SCHOOLS_SUCCESS,
  payload: { schools },
});

export {
  fetchSchools,
  fetchSchoolsFailure,
  fetchSchoolsSuccess,
};
