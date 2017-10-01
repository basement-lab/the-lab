/* eslint-disable no-underscore-dangle */

import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux';
import {
  routerReducer as router,
  routerMiddleware,
  // push, // Example: store.dispatch(push('/foo'))
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import client from './client.js';
import reducers from './reducers';

/******************************************************************************/

const initialState = {
};

/******************************************************************************/

export const reducer = combineReducers({
  ...reducers,
  apollo: client.reducer(),
  router,
});

export const history = createHistory();

const middleware = routerMiddleware(history);

/******************************************************************************/

export default createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(client.middleware()),
    applyMiddleware(middleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);
