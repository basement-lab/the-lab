
import React from 'react';
import { ApolloProvider as Provider } from 'react-apollo';
import { ConnectedRouter as Router } from 'react-router-redux';
import {
  Route,
  Link,
} from 'react-router-dom';

import store, { history } from './store';
import client from './client.js';
import { Input } from './components';

// import '../styles.css';

/******************************************************************************/

const App = () => (
  <Provider store={store} client={client}>
    <Router history={history}>
      <div id="basement-lab">
        <Input />
      </div>
    </Router>
  </Provider>
);


/******************************************************************************/

export default App;
