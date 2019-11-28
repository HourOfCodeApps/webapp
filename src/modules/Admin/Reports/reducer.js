import { REPORTS_UPDATED } from './constants';

const initialState = {
  // approvedTimeslotsCount: 0,
  // allTimeslotsCount: 0,
  reports: [],
  // mentorsFetching: false,
  // mentorsFetchingError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case REPORTS_UPDATED: {
      return {
        ...state,
        reports: action.payload.reports.slice(),
      };
    }

    default:
      return state;
  }
};

export default reducer;
export { initialState };
