/**
 * Tests for actions.
 */

// Application
import {
  fetchUsers,
  fetchUsersFailure,
  fetchUsersSuccess,
} from '../actions';
import {
  FETCH_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_SUCCESS,
} from '../constants';

import { users } from './mocks';

describe('Users - `actions`', () => {
  it('fetchUsers', () => {
    expect(fetchUsers()).toEqual({ type: FETCH_USERS });
  });

  it('fetchUsersFailure', () => {
    const error = new Error('Oops!');
    expect(fetchUsersFailure(error)).toEqual({
      type: FETCH_USERS_FAILURE,
      payload: { error },
    });
  });

  it('fetchUsersSuccess', () => {
    expect(fetchUsersSuccess(users)).toEqual({
      type: FETCH_USERS_SUCCESS,
      payload: { users },
    });
  });
});
