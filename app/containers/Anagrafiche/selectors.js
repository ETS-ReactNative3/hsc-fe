import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');
const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);
const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
};
