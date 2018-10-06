import {
  FETCH_SCHOOL,
  FETCH_SCHOOL_FAILURE,
  FETCH_SCHOOL_SUCCESS,
  FETCH_SCHOOLS,
  FETCH_SCHOOLS_FAILURE,
  FETCH_SCHOOLS_SUCCESS,
} from './constants';

const initialState = {
  school: null,
  schoolFetching: false,
  schoolFetchingError: null,
  schools: [],
  schoolsFetching: false,
  schoolsFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SCHOOL:
      return {
        ...state,
        school: null,
        schoolFetching: true,
        schoolFetchingError: null,
      };

    case FETCH_SCHOOL_FAILURE:
      return {
        ...state,
        schoolFetching: false,
        schoolFetchingError: action.payload.error,
      };

    case FETCH_SCHOOL_SUCCESS:
      return {
        ...state,
        school: action.payload.school,
        schoolFetching: false,
      };

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
