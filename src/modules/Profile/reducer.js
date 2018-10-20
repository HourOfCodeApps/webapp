import {
  FETCH_ME,
  FETCH_ME_FAILURE,
  FETCH_ME_SUCCESS,
  UPDATE_ME,
  UPDATE_ME_FAILURE,
  UPDATE_ME_SUCCESS,
} from './constants';

const initialState = {
  me: null,
  meFetching: false,
  meFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ME:
      return {
        ...state,
        me: null,
        meFetching: true,
        meFetchingError: null,
      };

    case FETCH_ME_FAILURE:
      return {
        ...state,
        meFetching: false,
        meFetchingError: action.payload.error,
      };

    case FETCH_ME_SUCCESS:
      return {
        ...state,
        meFetching: false,
        me: action.payload.me,
      };

    // case LOAD_USER_FAILURE:
    //   return {
    //     ...state,
    //     user: null,
    //     userLoadingError: action.payload.error,
    //     userLoading: false,
    //   };

    // case LOAD_USER_SUCCESS:
    //   return {
    //     ...state,
    //     user: action.payload.user,
    //     userLoading: false,
    //   };

    // case SIGNIN:
    //   return {
    //     ...state,
    //     auth: null,
    //     user: null,
    //     signingIn: true,
    //     signingInError: null,
    //   };

    // case SIGNIN_FAILURE:
    //   return {
    //     ...state,
    //     signingIn: false,
    //     signingInError: action.payload.error,
    //   };

    // case SIGNIN_SUCCESS:
    //   return {
    //     ...state,
    //     signingIn: false,
    //     auth: action.payload.auth,
    //   };

    // case SIGNUP:
    //   return {
    //     ...state,
    //     signingUp: true,
    //     signingUpError: null,
    //   };

    // case SIGNUP_FAILURE:
    //   return {
    //     ...state,
    //     signingUp: false,
    //     signingUpError: action.payload.error,
    //   };

    // case SIGNUP_SUCCESS:
    //   return {
    //     ...state,
    //     signingUp: false,
    //   };

    // case SIGNOUT_SUCCESS:
    //   return Object.assign({}, state, { user: null });

    // case STATE_INIT:
    //   return {
    //     ...state,
    //     stateInitLoaded: false,
    //   };

    // case STATE_CHANGED:
    //   return {
    //     ...state,
    //     stateInitLoaded: true,
    //     auth: action.payload.auth,
    //   };

    default:
      return state;
  }
};

export default reducer;
