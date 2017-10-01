
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { gray } from 'chalk';

import router from './routes';

/******************************************************************************/

const {
  API_PORT = 3050,
  PORT = 3000,
} = process.env;

/*******************************************************************************
  Express Server
*******************************************************************************/

const app = express();

app.use('*', cors({ origin: `http://localhost:${PORT}` }));

app.use('/api', bodyParser.json());

app.use('/api/status', (req, res) => res.sendStatus(200));

app.use(router);

app.listen(API_PORT, () => {
  console.log(gray(`\nAPI: running on port:${API_PORT}`)); // eslint-disable-line no-console
});

/******************************************************************************/

export default function onShutdown() {
  console.log(gray('API: shutting down...')); // eslint-disable-line no-console
}

