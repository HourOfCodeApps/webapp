import {
  LOAD_USER,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  STATE_CHANGED,
  STATE_INIT,
} from './constants';


const authStateInit = () => ({ type: STATE_INIT });

const stateChanged = auth => ({
  type: STATE_CHANGED,
  payload: { auth },
});

const loadUser = () => ({ type: LOAD_USER });

/**
 * Dispatch when loading user caused error
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const loadUserFailure = error => ({
  type: LOAD_USER_FAILURE,
  payload: { error },
});

/**
 * Dispatch when user data loaded successfully
 * @param {Object} user
 * @returns {{ type: String, payload: { user } }}
 */
const loadUserSuccess = user => ({
  type: LOAD_USER_SUCCESS,
  payload: { user },
});


/**
 * Dispatches an action to login
 *
 * @return {{type: String}}
 */
const login = () => ({ type: LOGIN });

/**
 *
 * @param error
 * @return {{type: String, payload}}
 */
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error });

const loginSuccess = auth => ({ type: LOGIN_SUCCESS, payload: auth });

const logout = () => ({ type: LOGOUT });


const logoutFailure = error => ({ type: LOGOUT_FAILURE, payload: error });

const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

/**
 * Signup action
 * @param {Object} userData user data
 * @returns {Object}
 */
const signup = userData => ({
  type: SIGNUP,
  payload: { userData },
});

const signupFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: { error },
});

const signupSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: { user },
});


export {
  authStateInit,
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  signup,
  signupFailure,
  signupSuccess,
  stateChanged,
};
