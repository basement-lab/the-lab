
import { yellow, red } from 'chalk';
import { Client } from 'pg';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

const pg = new Client({
  port: 32770,
  host: 'localhost',
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: 'lab',
});

pg.connect()
  .then(() => console.log(yellow('PostgreSQL: connected')))
  .catch((err) => {
    console.log(red('\nConnection to PostgreSQL failed!\n'));
    throw err;
  });


export default pg;
