
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { PubSub } from 'graphql-subscriptions';
import OpticsAgent from 'optics-agent';
import {
  execute,
  subscribe,
  printSchema,
} from 'graphql';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { magenta } from 'chalk';

import schema from './schema';
import postgres from '../db';

/******************************************************************************/

const {
  PORT = 3000,
  ROOT_DOMAIN = 'localhost',
  GRAPHQL_PORT = 4000,
  GRAPHQL_PATH = '/subscriptions',
} = process.env;

/*******************************************************************************
  Express Server
*******************************************************************************/

const app = express();

app.use('*', cors({ origin: `http://localhost:${PORT}` }));

app.use('/graphql', bodyParser.json());

app.use('/graphql', OpticsAgent.middleware());

app.use('/graphql/status', (req, res) => res.sendStatus(200));

OpticsAgent.instrumentSchema(schema);

app.use('/graphql', graphqlExpress(req => ({
  rootValue: {
  },
  context: {
    opticsContext: OpticsAgent.context(req),
    postgres,
    // userId: Math.floor(Math.random() * 3),
  },
  schema,
  allowUndefinedInResolve: true,
  pretty: true,
  formatError: error => ({
    message: error.message,
    locations: error.locations,
    stack: error.stack,
    path: error.path,
  }),
  graphiql: true,
  // validationRules: () => null,
})));


/*******************************************************************************
  GraphiQL
*******************************************************************************/

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:${GRAPHQL_PORT}${GRAPHQL_PATH}`,
}));


/*******************************************************************************
  GraphQL Schema
*******************************************************************************/

app.use('/schema', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(printSchema(schema));
  res.status(200);
});


/*******************************************************************************
  Subscriptions Server
*******************************************************************************/

// const pubsub = new PubSub();

const server = app.listen(GRAPHQL_PORT, () => console.log(magenta(
  `GraphQL: is running on 'http://${ROOT_DOMAIN}:${GRAPHQL_PORT}'`)
));

new SubscriptionServer({ execute, schema, subscribe }, { server }); // eslint-disable-line no-new

/******************************************************************************/

