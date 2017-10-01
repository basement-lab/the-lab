
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

const api = express();

api.use('*', cors({ origin: `http://localhost:${PORT}` }));

api.use('/api', bodyParser.json());

api.use('/api/status', (req, res) => res.sendStatus(200));

api.use(router);

api.listen(API_PORT, () => {
  console.log(gray(`API: running on port:${API_PORT}`)); // eslint-disable-line no-console
});

/******************************************************************************/

