/* eslint-disable no-console */

import express from 'express';
import history from 'connect-history-api-fallback';
import proxy from 'http-proxy-middleware';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { blue, gray, magenta } from 'chalk';

// import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import ProgressBarWebpackPlugin from 'progress-bar-webpack-plugin';

import config from '../webpack.config';
import logProvider from './logger';

/******************************************************************************/

const {
  PORT = 3000,
  API_PORT = 3050,
  GRAPHQL_PORT = 4000,
  GRAPHQL_PATH = '/subscriptions',
} = process.env;

/*******************************************************************************
 * Webpack Compiler
 ******************************************************************************/

const compiler = webpack(config);

// compiler.apply(new FriendlyErrorsWebpackPlugin()); // NOTE:overwrites Node process logs

compiler.apply(new ProgressBarWebpackPlugin());

const devMiddleware = webpackDevMiddleware(compiler, {
  // noInfo: true, // enable for Node console
  quiet: true, // enable for Webpack (client) logs
  // quiet: false, // enable for full Webpack (client) logs

  hot: true,
  inline: true,
  historyApiFallback: true,

  publicPath: '/',
  ignored: /node_modules/,
  stats: { color: true },
  clientLogLevel: 'none',
});

/*******************************************************************************
 * Express Server
 ******************************************************************************/

const app = express();

/******************************************************************************/

app.use('/api', proxy({
  target: `http://localhost:${API_PORT}`,
  changeOrigin: true,
  logLevel: 'debug',
  logProvider,
}));


/******************************************************************************/

app.use(GRAPHQL_PATH, proxy({
  target: `http://localhost:${GRAPHQL_PORT}`,
  changeOrigin: true,
  ws: true,
  logLevel: 'debug',
  logProvider,
}));


const gqlProxy = proxy({
  target: `http://localhost:${GRAPHQL_PORT}`,
  changeOrigin: true,
  logLevel: 'debug',
  logProvider,
});

app.use('/graphiql', gqlProxy);
app.use('/graphql', gqlProxy);
app.use('/schema', gqlProxy);
app.use('/status', (req, res) => res.sendStatus(200));

app.use(history({ logger: console.log }));

/******************************************************************************/

app.use(devMiddleware);

app.use(webpackHotMiddleware(compiler.compilers.find(c => c.name === 'client'), {
  // dynamicPublicPath: true,
  log: logProvider,
}));

/******************************************************************************/

app.listen(PORT, () => {
  console.log(blue(`\nSERVER: running on port:${PORT}`));
});

/******************************************************************************/

require('./api');
require('./graphql');



