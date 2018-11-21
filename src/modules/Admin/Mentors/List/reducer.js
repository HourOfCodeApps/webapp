import {
  FETCH_MENTORS,
  FETCH_MENTORS_FAILURE,
  FETCH_MENTORS_SUCCESS,
} from './constants';

const initialState = {
  approvedTimeslotsCount: 0,
  allTimeslotsCount: 0,
  mentors: [],
  mentorsFetching: false,
  mentorsFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MENTORS:
      return {
        ...state,
        mentors: [],
        mentorsFetching: true,
        mentorsFetchingError: null,
      };

    case FETCH_MENTORS_FAILURE:
      return {
        ...state,
        mentorsFetching: false,
        mentorsFetchingError: action.payload.error,
      };

    case FETCH_MENTORS_SUCCESS: {
      const { all, approved } = action.payload.mentors.reduce((acc, m) => ({
        all: acc.all + (m.mentor.timeslotsCount || 0),
        approved: acc.approved + (m.mentor.approvedTimeslotsCount || 0),
      }),
      { all: 0, approved: 0 });

      return {
        ...state,
        mentors: action.payload.mentors.slice(),
        mentorsFetching: false,
        approvedTimeslotsCount: approved,
        allTimeslotsCount: all,
      };
    }

    default:
      return state;
  }
};

export default reducer;
export { initialState };
