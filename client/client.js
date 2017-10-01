
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import {
  SubscriptionClient,
  // Client, // coming in v0.9.0
  addGraphQLSubscriptions, // NOTE: depricated in v0.9.0
} from 'subscriptions-transport-ws';

/******************************************************************************/

const {
  GRAPHQL_PORT = 4000,
  GRAPHQL_PATH = '/subscriptions',
} = process.env;

const wsClient = new SubscriptionClient(`ws://localhost:${GRAPHQL_PORT}${GRAPHQL_PATH}`, {
  reconnect: true,
});

const networkInterfaceHTTP = createNetworkInterface({
  uri: `http://localhost:${GRAPHQL_PORT}/graphql`,
  opts: {
    credentials: 'same-origin',
  },
});

const networkInterface = addGraphQLSubscriptions(
  networkInterfaceHTTP,
  wsClient
);

const client = new ApolloClient({ networkInterface });

/******************************************************************************/

export default client;
