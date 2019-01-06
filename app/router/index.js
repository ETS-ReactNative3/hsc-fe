import createHistory from 'history/createBrowserHistory';
import { connectRoutes, NOT_FOUND } from 'redux-first-router';
import queryString from 'query-string';

export const defaultThunk = () => {
  /* dispatch, getState */
  // doDefaultRedirect(dispatch, getState().services.easUsers.loggedIn);
};

// function doDefaultRedirect(dispatch, loggedInUser) {
//   const compare = loggedInUser.exists;
//   const isEmployee = compare === 'yes' ? loggedInUser.user.isEmployee ? 'yes' : 'no' : 'unknown';
//   if (isEmployee === 'yes') {
//     console.log('Employee, redirecting to ADMIN');
//     dispatch(redirect({ type: 'RTE_ADMIN' }));
//   } else if (isEmployee === 'no') {
//     console.log('Not an employee, redirecting to flights');
//     dispatch(redirect({ type: 'RTE_FLIGHTS', payload: { mineOrAll: 'mine', timeRange: 'upcoming' } }));
//   }
// }

const history = createHistory();
const routesMap = {
  RTE_FLIGHTS: {
    path: '/flights/:mineOrAll/:timeRange',
    thunk: () => {
      console.log('DAAAAA Fligths');
    },
  },
  RTE_CONSTRUCTION: '/construction',
  RTE_ADMIN: '/login',
  RTE_USER: '/user/:userId/:detailsOrTransactions',
  RTE_USER_SEARCH: '/user-search/:encodedSearchString',

  [NOT_FOUND]: {
    path: '/not-found',
    thunk: defaultThunk,
  },
  REDIR_ROOT: {
    path: '/',
    thunk: defaultThunk,
  },
  REDIR_EMPTY: {
    path: '',
    thunk: defaultThunk,
  },
};

export function createDefaultRedirector(dispatch) {
  return (type) => {
    if (routesMap[type].thunk === defaultThunk) {
      dispatch(defaultThunk);
    }
  };
}

const { reducer, middleware, enhancer } = connectRoutes(history, routesMap, {
  querySerializer: queryString,
});

export const routerMiddleware = middleware;
export const routerReducer = reducer;
export const routerEnhancer = enhancer;
