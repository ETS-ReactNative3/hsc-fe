/*
 *
 * Auth reducer
 *
 */

import { fromJS } from 'immutable';
import {
  AUTH_ACTION,
  REVOKE_AUTH_ACTION,
} from './constants';

const initialState = fromJS({
  authenticate: {},
  revoke: {},
});

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_ACTION:
      if (action.payload.result && action.payload.result.status) {
        const authenticate = state.toJS().authenticate;
        Object.assign(authenticate, action.payload.result);
        return fromJS({
          authenticate,
        });
      }
      return state;
    case REVOKE_AUTH_ACTION:
      return state.set('revoke', action.payload.result);
    default:
      return state;
  }
}
