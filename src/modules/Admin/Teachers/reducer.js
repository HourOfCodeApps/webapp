import {
  APPROVE_TEACHERS,
  APPROVE_TEACHERS_FAILURE,
  APPROVE_TEACHERS_SUCCESS,
  FETCH_TEACHERS,
  FETCH_TEACHERS_FAILURE,
  FETCH_TEACHERS_SUCCESS,
} from './constants';

const initialState = {
  teachers: [],
  teachersApproving: false,
  teachersApprovingError: null,
  teachersFetching: false,
  teachersFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case APPROVE_TEACHERS:
      return {
        ...state,
        teachersApproving: true,
        teachersApprovingError: null,
      };

    case APPROVE_TEACHERS_FAILURE:
      return {
        ...state,
        teachersApproving: false,
        teachersApprovingError: action.payload.error,
      };

    case APPROVE_TEACHERS_SUCCESS:
      return {
        ...state,
        teachersApproving: false,
      };

    case FETCH_TEACHERS:
      return {
        ...state,
        teachers: [],
        teachersFetching: true,
        teachersFetchingError: null,
      };

    case FETCH_TEACHERS_FAILURE:
      return {
        ...state,
        teachersFetching: false,
        teachersFetchingError: action.payload.error,
      };

    case FETCH_TEACHERS_SUCCESS:
      return {
        ...state,
        teachers: action.payload.teachers.slice(),
        teachersFetching: false,
      };

    default:
      return state;
  }
};

export default reducer;
export { initialState };
