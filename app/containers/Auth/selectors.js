import { createSelector } from 'reselect';

/**
 * Direct selector to the auth state domain
 */
const selectAuthDomain = (state) => state.get('auth');

/**
 * Default selector used by Auth
 */

const makeSelectStatusAuth = () => createSelector(
  selectAuthDomain,
  (auth) => auth.get('authenticate')
);
const makeSelectStatusLogout = () => createSelector(
  selectAuthDomain,
  (auth) => auth.get('revoke')
);

export {
  makeSelectStatusAuth,
  makeSelectStatusLogout,
};
