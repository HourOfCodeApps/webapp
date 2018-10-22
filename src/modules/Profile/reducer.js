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
  meUpdating: false,
  meUpdatingError: null,
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
        me: action.payload.me,
        meFetching: false,
      };

    case UPDATE_ME:
      return {
        ...state,
        meUpdating: true,
        meUpdatingError: null,
      };

    case UPDATE_ME_FAILURE:
      return {
        ...state,
        meUpdating: false,
        meUpdatingError: action.payload.error,
      };

    case UPDATE_ME_SUCCESS:
      return {
        ...state,
        me: action.payload.me,
        meUpdating: false,
      };

    default:
      return state;
  }
};

export default reducer;
