import {
  CREATE_SCHOOL,
  CREATE_SCHOOL_FAILURE,
  CREATE_SCHOOL_SUCCESS,
  DELETE_SCHOOL,
  DELETE_SCHOOL_FAILURE,
  DELETE_SCHOOL_SUCCESS,
  FETCH_SCHOOL,
  FETCH_SCHOOL_FAILURE,
  FETCH_SCHOOL_SUCCESS,
  FETCH_SCHOOLS,
  FETCH_SCHOOLS_FAILURE,
  FETCH_SCHOOLS_SUCCESS,
  UPDATE_SCHOOL,
  UPDATE_SCHOOL_FAILURE,
  UPDATE_SCHOOL_SUCCESS,
  FETCH_SCHOOL_TIMESLOTS,
  FETCH_SCHOOL_TIMESLOTS_FAILURE,
  FETCH_SCHOOL_TIMESLOTS_SUCCESS,
} from './constants';

const initialState = {
  school: null,
  schoolDeleting: false,
  schoolDeletingError: null,
  schoolFetching: false,
  schoolFetchingError: null,
  schools: [],
  schoolsFetching: false,
  schoolsFetchingError: null,
  schoolsMap: {},
  schoolTimeslots: [],
  schoolTimeslotsFetching: false,
  schoolTimeslotsFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_SCHOOL:
      return {
        ...state,
        schoolCreating: true,
        schoolCreatingError: null,
      };

    case CREATE_SCHOOL_FAILURE:
      return {
        ...state,
        schoolCreating: false,
        schoolCreatingError: action.payload.error,
      };

    case CREATE_SCHOOL_SUCCESS:
      return {
        ...state,
        school: action.payload.school,
        schoolCreating: false,
      };

    case DELETE_SCHOOL:
      return {
        ...state,
        schoolDeleting: true,
        schoolDeletingError: null,
      };

    case DELETE_SCHOOL_FAILURE:
      return {
        ...state,
        schoolDeleting: false,
        schoolDeletingError: action.payload.error,
      };

    case DELETE_SCHOOL_SUCCESS:
      return {
        ...state,
        schoolDeleting: false,
      };

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

    case FETCH_SCHOOL_TIMESLOTS:
      return {
        ...state,
        schoolTimeslotsFetching: true,
        schoolTimeslotsFetchingError: null,
      };

    case FETCH_SCHOOL_TIMESLOTS_FAILURE:
      return {
        ...state,
        schoolTimeslotsFetching: false,
        schoolTimeslotsFetchingError: action.payload.error,
      };

    case FETCH_SCHOOL_TIMESLOTS_SUCCESS:
      return {
        ...state,
        schoolTimeslots: action.payload.timeslots,
        schoolTimeslotsFetching: false,
      };

    case FETCH_SCHOOLS:
      return {
        ...state,
        schools: [],
        schoolsMap: {},
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
        schoolsMap: action.payload.schools.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}),
        schoolsFetching: false,
      };

    case UPDATE_SCHOOL:
      return {
        ...state,
        schoolUpdating: true,
        schoolUpdatingError: null,
      };

    case UPDATE_SCHOOL_FAILURE:
      return {
        ...state,
        schoolUpdating: false,
        schoolUpdatingError: action.payload.error,
      };

    case UPDATE_SCHOOL_SUCCESS:
      return {
        ...state,
        school: action.payload.school,
        schoolUpdating: false,
      };

    default:
      return state;
  }
};

export default reducer;
export { initialState };
