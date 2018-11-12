import {
  CREATE_SCHOOL,
  CREATE_SCHOOL_FAILURE,
  CREATE_SCHOOL_SUCCESS,
  DELETE_SCHOOL,
  DELETE_SCHOOL_FAILURE,
  DELETE_SCHOOL_SUCCESS,
  FETCH_SCHOOL,
  FETCH_SCHOOL_FAILURE,
  FETCH_SCHOOL_SUCCESS,
  FETCH_SCHOOLS,
  FETCH_SCHOOLS_FAILURE,
  FETCH_SCHOOLS_SUCCESS,
  UPDATE_SCHOOL,
  UPDATE_SCHOOL_FAILURE,
  UPDATE_SCHOOL_SUCCESS,
  FETCH_SCHOOL_TIMESLOTS,
  FETCH_SCHOOL_TIMESLOTS_FAILURE,
  FETCH_SCHOOL_TIMESLOTS_SUCCESS,
} from './constants';

/**
 * Create school action
 * @param {Object} data
 * @returns {{ type: String }}
 */
const createSchool = data => ({
  type: CREATE_SCHOOL,
  payload: { data },
});

/**
 * Create school failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const createSchoolFailure = error => ({
  type: CREATE_SCHOOL_FAILURE,
  payload: { error },
});

/**
 * Create school success action
 * @returns {{ type: String, payload: { school } }}
 */
const createSchoolSuccess = school => ({
  type: CREATE_SCHOOL_SUCCESS,
  payload: { school },
});

/**
 * Delete school action
 * @param {String} id
 * @returns {{ type: String }}
 */
const deleteSchool = id => ({
  type: DELETE_SCHOOL,
  payload: { id },
});

/**
 * Delete school failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const deleteSchoolFailure = error => ({
  type: DELETE_SCHOOL_FAILURE,
  payload: { error },
});

/**
 * Delete school success action
 * @returns {{ type: String, payload: { school } }}
 */
const deleteSchoolSuccess = () => ({
  type: DELETE_SCHOOL_SUCCESS,
});

/**
 * Fetch school action
 * @param {String} id
 * @returns {{ type: String }}
 */
const fetchSchool = id => ({
  type: FETCH_SCHOOL,
  payload: { id },
});

/**
 * Fetch school failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchSchoolFailure = error => ({
  type: FETCH_SCHOOL_FAILURE,
  payload: { error },
});

/**
 * Fetch school success action
 * @param {Object} school
 * @returns {{ type: String, payload: { school } }}
 */
const fetchSchoolSuccess = school => ({
  type: FETCH_SCHOOL_SUCCESS,
  payload: { school },
});

/**
 * Fetch timeslots action
 * @param {String} schoolId
 * @returns {{ type: String }}
 */
const fetchSchoolTimeslots = schoolId => ({
  type: FETCH_SCHOOL_TIMESLOTS,
  payload: { schoolId },
});

/**
 * Fetch timeslots failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchSchoolTimeslotsFailure = error => ({
  type: FETCH_SCHOOL_TIMESLOTS_FAILURE,
  payload: { error },
});

/**
 * Fetch timeslots success action
 * @param {Array} timeslots
 * @returns {{ type: String, payload: { timeslots } }}
 */
const fetchSchoolTimeslotsSuccess = timeslots => ({
  type: FETCH_SCHOOL_TIMESLOTS_SUCCESS,
  payload: { timeslots },
});

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

/**
 * Update school action
 * @param {String} id
 * @param {Object} data
 * @returns {{ type: String }}
 */
const updateSchool = (id, data) => ({
  type: UPDATE_SCHOOL,
  payload: { id, data },
});

/**
 * Update school failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const updateSchoolFailure = error => ({
  type: UPDATE_SCHOOL_FAILURE,
  payload: { error },
});

/**
 * Update school success action
 * @param {Object} school
 * @returns {{ type: String, payload: { school } }}
 */
const updateSchoolSuccess = school => ({
  type: UPDATE_SCHOOL_SUCCESS,
  payload: { school },
});

export {
  createSchool,
  createSchoolFailure,
  createSchoolSuccess,
  deleteSchool,
  deleteSchoolFailure,
  deleteSchoolSuccess,
  fetchSchool,
  fetchSchoolFailure,
  fetchSchoolSuccess,
  fetchSchools,
  fetchSchoolsFailure,
  fetchSchoolsSuccess,
  updateSchool,
  updateSchoolFailure,
  updateSchoolSuccess,
  fetchSchoolTimeslots,
  fetchSchoolTimeslotsFailure,
  fetchSchoolTimeslotsSuccess,
};
