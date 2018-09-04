import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  STATE_CHANGED,
  STATE_INIT,
} from './constants';

const initialState = {
  user: null,
  error: null,
  loginInProgress: false,
  stateInitLoaded: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: null,
        error: null,
        loginInProgress: true,
      };

    case LOGIN_SUCCESS: {
      const user = action.payload;
      return {
        ...state,
        user,
        loginInProgress: false,
      };
      // return Object.assign({}, state, { user, loginInProgress: false });
    }

    case LOGIN_FAILURE: {
      const auth = action.payload;
      return Object.assign({}, state, auth);
    }

    case LOGOUT_SUCCESS:
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
        user: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
