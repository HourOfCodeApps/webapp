import {
  LOGIN,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  STATE_CHANGED,
  STATE_INIT,
} from './constants';


const authStateInit = () => ({ type: STATE_INIT });

const stateChanged = user => ({ type: STATE_CHANGED, payload: user });

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

const loginSuccess = user => ({ type: LOGIN_SUCCESS, payload: user });

const logout = () => ({ type: LOGOUT });


const logoutFailure = error => ({ type: LOGOUT_FAILURE, payload: error });

const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export {
  authStateInit,
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutFailure,
  logoutSuccess,
  stateChanged,
};
