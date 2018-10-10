import {
  APPROVE_TEACHERS,
  APPROVE_TEACHERS_FAILURE,
  APPROVE_TEACHERS_SUCCESS,
  FETCH_TEACHERS,
  FETCH_TEACHERS_FAILURE,
  FETCH_TEACHERS_SUCCESS,
} from './constants';

/**
 * Approve teachers action
 * @param {Array|String} teacherdIds
 * @returns {{ type: String }}
 */
const approveTeachers = teacherIds => ({
  type: APPROVE_TEACHERS,
  payload: { teacherIds: Array.isArray(teacherIds) ? teacherIds : [teacherIds] },
});

/**
 * Approve teachers failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const approveTeachersFailure = error => ({
  type: APPROVE_TEACHERS_FAILURE,
  payload: { error },
});

/**
 * Approve teachers success action
 * @returns {{ type: String, payload: { teachers } }}
 */
const approveTeachersSuccess = () => ({
  type: APPROVE_TEACHERS_SUCCESS,
});

/**
 * Fetch teachers action
 * @returns {{ type: String }}
 */
const fetchTeachers = () => ({
  type: FETCH_TEACHERS,
});

/**
 * Fetch teachers failed action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const fetchTeachersFailure = error => ({
  type: FETCH_TEACHERS_FAILURE,
  payload: { error },
});

/**
 * Fetch teachers success action
 * @param {Array} teachers
 * @returns {{ type: String, payload: { teachers } }}
 */
const fetchTeachersSuccess = teachers => ({
  type: FETCH_TEACHERS_SUCCESS,
  payload: { teachers },
});

export {
  approveTeachers,
  approveTeachersFailure,
  approveTeachersSuccess,
  fetchTeachers,
  fetchTeachersFailure,
  fetchTeachersSuccess,
};
