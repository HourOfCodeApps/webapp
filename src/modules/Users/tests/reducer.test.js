/**
 * Tests for reducer
 */

// Application
import reducer, {
  initialState,
} from '../reducer';
import {
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
} from '../actions';

const users = [
  { username: 'username1' },
  { username: 'username2' },
  { username: 'username3' },
];

describe('Users - `reducer`', () => {
  it('returns the initial state when no state exists yet', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('FETCH_USERS', () => {
    const prevState = {
      ...initialState,
      usersFetching: false,
      usersFetchingError: true,
      users,
    };

    const newState = {
      ...initialState,
      usersFetching: true,
      usersFetchingError: null,
      users: [],
    };

    expect(reducer(prevState, fetchUsers())).toEqual(newState);
  });

  it('FETCH_USERS_FAILURE', () => {
    const error = new Error('Oops!');

    const prevState = {
      ...initialState,
      usersFetching: true,
      usersFetchingError: null,
      users: [],
    };

    const newState = {
      ...initialState,
      usersFetching: false,
      usersFetchingError: error,
      users: [],
    };

    expect(reducer(prevState, fetchUsersFailure(error))).toEqual(newState);
  });

  it('FETCH_USERS_SUCCESS', () => {
    const prevState = {
      ...initialState,
      usersFetching: true,
      usersFetchingError: null,
      users: [],
    };

    const newState = {
      ...initialState,
      usersFetching: false,
      usersFetchingError: null,
      users,
    };

    expect(reducer(prevState, fetchUsersSuccess(users))).toEqual(newState);
  });
});
