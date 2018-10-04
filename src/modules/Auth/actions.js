import {
  LOAD_USER,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  SIGNIN,
  SIGNIN_FAILURE,
  SIGNIN_SUCCESS,
  SIGNOUT,
  SIGNOUT_FAILURE,
  SIGNOUT_SUCCESS,
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
 * Dispatches an action to sign in
 *
 * @return {{type: String}}
 */
const signIn = (provider, data = {}) => ({
  type: SIGNIN,
  payload: {
    provider,
    data,
  },
});

/**
 *
 * @param error
 * @return {{type: String, payload}}
 */
const signInFailure = error => ({
  type: SIGNIN_FAILURE,
  payload: { error },
});

const signInSuccess = auth => ({
  type: SIGNIN_SUCCESS,
  payload: { auth },
});

const signOut = () => ({ type: SIGNOUT });


const signOutFailure = error => ({
  type: SIGNOUT_FAILURE,
  payload: { error },
});

const signOutSuccess = () => ({ type: SIGNOUT_SUCCESS });

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
  signIn,
  signInFailure,
  signInSuccess,
  signOut,
  signOutFailure,
  signOutSuccess,
  signup,
  signupFailure,
  signupSuccess,
  stateChanged,
};
