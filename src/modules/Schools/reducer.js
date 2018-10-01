import {
  FETCH_SCHOOLS,
  FETCH_SCHOOLS_FAILURE,
  FETCH_SCHOOLS_SUCCESS,
} from './constants';

const initialState = {
  schools: [],
  schoolsFetching: false,
  schoolsFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHOOLS:
      return {
        ...state,
        schools: [],
        schoolsFetching: true,
        schoolsFetchingError: null,
      };

    case FETCH_SCHOOLS_FAILURE:
      return {
        ...state,
        schoolsFetching: false,
        schoolsFetchingError: action.payload.error,
      };

    case FETCH_SCHOOLS_SUCCESS:
      return {
        ...state,
        schools: action.payload.schools.slice(),
        schoolsFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
export { initialState };
