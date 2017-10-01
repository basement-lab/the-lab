
import bodyParser from 'body-parser';
import express from 'express';
import { gray } from 'chalk';

import router from './routes';

/******************************************************************************/

const {
  API_PORT = 3050,
} = process.env;

const app = express();

app.use('/api', bodyParser.json());

app.use('/api/status', (req, res) => res.sendStatus(200));

app.use(router);

app.listen(API_PORT, () => {
  console.log(gray(`\nAPI: running on port:${API_PORT}`)); // eslint-disable-line no-console
});
