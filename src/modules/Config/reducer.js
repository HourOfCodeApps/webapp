import {
  FETCH_CONFIG,
  FETCH_CONFIG_FAILURE,
  FETCH_CONFIG_SUCCESS,
} from './constants';

const initialState = {
  config: null,
  isConfigFetching: false,
  isConfigLoaded: false,
  configFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONFIG:
      return {
        ...state,
        config: null,
        isConfigFetching: true,
        // isConfigLoaded: false,
        configFetchingError: null,
      };

    case FETCH_CONFIG_FAILURE:
      return {
        ...state,
        isConfigFetching: false,
        configFetchingError: action.payload.error,
      };

    case FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        config: action.payload.config,
        isConfigFetching: false,
        isConfigLoaded: true,
      };

    default:
      return state;
  }
};

export default reducer;
export { initialState };
