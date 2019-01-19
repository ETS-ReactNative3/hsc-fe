
import {
  authAction,
} from '../actions';
import {
  AUTH_ACTION,
} from '../constants';

describe('Auth actions', () => {
  describe('AUTH Action', () => {
    it('has a type of AUTH_ACTION', () => {
      const expected = {
        type: AUTH_ACTION,
      };
      expect(authAction()).toEqual(expected);
    });
  });
});
