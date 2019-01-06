/**
 * Create the store with dynamic reducers
 */

import base64 from 'base-64';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
import { execAuthenticate } from './containers/Auth/actions';
import { routerMiddleware, routerEnhancer } from './router';
const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  // *, history*/
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  // const middlewares = [
  //   sagaMiddleware,
  //   routerMiddleware(history),
  // ];

  const enhancers = [
    applyMiddleware(
      thunkMiddleware
    ),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
    applyMiddleware(
      routerEnhancer,
      routerMiddleware,
      thunkMiddleware
    )
  );
  if (localStorage.getItem('username') && localStorage.getItem('password') && localStorage.getItem('username') !== 'undefined') {
    const data = {
      rq_Username: localStorage.getItem('username'),
      rq_Password: base64.decode(localStorage.getItem('password')),
    };
    store.dispatch(execAuthenticate(data));
  }

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
