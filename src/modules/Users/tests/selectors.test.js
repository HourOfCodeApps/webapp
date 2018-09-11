/**
 * Tests for selectors.
 */

// Application
import {
  selectUsers,
  selectUsersDomain,
  selectUsersFetching,
  selectUsersFetchingError,
} from '../selectors';

import { initialState } from '../reducer';
import { users } from './mocks';

describe('Users - `selectors`', () => {
  describe('selectUsers', () => {
    it('values', () => {
      const state = {
        users: {
          ...initialState,
          users,
        },
      };

      expect(selectUsers()(state)).toEqual(users);
    });

    it('empty', () => {
      const state = {
        users: {
          ...initialState,
          users: [],
        },
      };

      expect(selectUsers()(state)).toEqual([]);
    });
  });

  describe('selectUsersFetchingError', () => {
    it('error', () => {
      const error = new Error('Oops!');
      const state = {
        users: {
          ...initialState,
          usersFetchingError: error,
        },
      };

      expect(selectUsersFetchingError()(state)).toEqual(error);
    });

    it('empty', () => {
      const state = {
        users: {
          ...initialState,
          usersFetchingError: null,
        },
      };

      expect(selectUsersFetchingError()(state)).toEqual(null);
    });
  });

  it('selectUsersDomain', () => {
    const substate = {
      ...initialState,
      usersFetchingError: null,
    };
    const state = { users: substate };

    expect(selectUsersDomain()(state)).toEqual(substate);
  });

  describe('selectUsersFetching', () => {
    it('true', () => {
      const state = {
        users: {
          ...initialState,
          usersFetching: true,
        },
      };

      expect(selectUsersFetching()(state)).toEqual(true);
    });

    it('false', () => {
      const state = {
        users: {
          ...initialState,
          usersFetching: false,
        },
      };

      expect(selectUsersFetching()(state)).toEqual(false);
    });
  });
});
