/* eslint-disable react/jsx-filename-extension  */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App.jsx';
import store from './store';

// import './index.css';

/******************************************************************************/

console.log('CLIENT: is running');

/******************************************************************************/

render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('root')
);

/******************************************************************************/

if (module.hot) {
  module.hot.accept('./store', () => {
    const reducer = require('./reducers').default; // eslint-disable-line global-require
    store.replaceReducer(reducer);
  });

  module.hot.accept('./App.jsx', () => {
    const NewApp = require('./App.jsx').default; // eslint-disable-line global-require

    render(
      <AppContainer>
        <NewApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

/******************************************************************************/

// SEE: https://github.com/reactjs/react-redux/releases/tag/v2.0.0
