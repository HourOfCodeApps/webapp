import {
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  LOAD_USER,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP,
  SIGNUP_FAILURE,
  SIGNUP_SUCCESS,
  SIGNOUT_SUCCESS,
  STATE_CHANGED,
  STATE_INIT,
} from './constants';

const initialState = {
  auth: null,
  user: null,
  userLoading: false,
  userError: false,
  error: null,
  loginInProgress: false,
  stateInitLoaded: false,
  signingIn: false,
  signingInError: null,
  signingUp: false,
  signingUpError: null,
  forgotPasswordInProgress: false,
  forgotPasswordInProgressError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordInProgress: true,
        forgotPasswordInProgressError: null,
      };

    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordInProgress: false,
        forgotPasswordInProgressError: action.payload.error,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordInProgress: false,
      };

    case LOAD_USER:
      return {
        ...state,
        user: null,
        userLoading: true,
        userLoadingError: null,
      };

    case LOAD_USER_FAILURE:
      return {
        ...state,
        user: null,
        userLoadingError: action.payload.error,
        userLoading: false,
      };

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        userLoading: false,
      };

    case SIGNIN:
      return {
        ...state,
        auth: null,
        user: null,
        signingIn: true,
        signingInError: null,
      };

    case SIGNIN_FAILURE:
      return {
        ...state,
        signingIn: false,
        signingInError: action.payload.error,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        signingIn: false,
        auth: action.payload.auth,
      };

    case SIGNUP:
      return {
        ...state,
        signingUp: true,
        signingUpError: null,
      };

    case SIGNUP_FAILURE:
      return {
        ...state,
        signingUp: false,
        signingUpError: action.payload.error,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        signingUp: false,
      };

    case SIGNOUT_SUCCESS:
      return Object.assign({}, state, { user: null });

    case STATE_INIT:
      return {
        ...state,
        stateInitLoaded: false,
      };

    case STATE_CHANGED:
      return {
        ...state,
        stateInitLoaded: true,
        auth: action.payload.auth,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

export default reducer;
