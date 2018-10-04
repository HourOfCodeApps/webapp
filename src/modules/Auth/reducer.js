import {
  LOAD_USER,
  LOAD_USER_FAILURE,
  LOAD_USER_SUCCESS,
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        user: null,
        userLoading: true,
      };

    case LOAD_USER_FAILURE:
      return {
        ...state,
        user: null,
        userError: action.payload.error,
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
      };

    default:
      return state;
  }
};

export default reducer;
