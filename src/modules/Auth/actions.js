import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  // LOAD_USER,
  // LOAD_USER_FAILURE,
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
  STATE_INIT_SUCCESS,
  UPDATE_USER,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from './constants';


const authStateInit = () => ({ type: STATE_INIT });

const authStateInitSuccess = () => ({ type: STATE_INIT_SUCCESS });

/**
 * Forgot password action
 * @param {String} email
 * @returns {{ type: String, payload: { email: String } }}
 */
const forgotPassword = email => ({
  type: FORGOT_PASSWORD,
  payload: { email },
});

/**
 * Forgot password failure action
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const forgotPasswordFailure = error => ({
  type: FORGOT_PASSWORD_FAILURE,
  payload: { error },
});

/**
 * Forgot password success action
 * @returns {{ type: String }}
 */
const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS,
});


const stateChanged = (auth, user) => ({
  type: STATE_CHANGED,
  payload: { auth, user: user || null },
});

// const loadUser = () => ({ type: LOAD_USER });

// /**
//  * Dispatch when loading user caused error
//  * @param {Object} error
//  * @returns {{ type: String, payload: { error } }}
//  */
// const loadUserFailure = error => ({
//   type: LOAD_USER_FAILURE,
//   payload: { error },
// });

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
const signUp = userData => ({
  type: SIGNUP,
  payload: { userData },
});

const signUpFailure = error => ({
  type: SIGNUP_FAILURE,
  payload: { error },
});

const signUpSuccess = user => ({
  type: SIGNUP_SUCCESS,
  payload: { user },
});

const updateUser = userData => ({
  type: UPDATE_USER,
  payload: { userData },
});

/**
 * Dispatch when loading user caused error
 * @param {Object} error
 * @returns {{ type: String, payload: { error } }}
 */
const updateUserFailure = error => ({
  type: UPDATE_USER_FAILURE,
  payload: { error },
});

/**
 * Dispatch when user data loaded successfully
 * @param {Object} user
 * @returns {{ type: String, payload: { user } }}
 */
const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: { user },
});


export {
  authStateInit,
  authStateInitSuccess,
  forgotPassword,
  forgotPasswordFailure,
  forgotPasswordSuccess,
  // loadUser,
  loadUserSuccess,
  // loadUserFailure,
  signIn,
  signInFailure,
  signInSuccess,
  signOut,
  signOutFailure,
  signOutSuccess,
  signUp,
  signUpFailure,
  signUpSuccess,
  stateChanged,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
};
