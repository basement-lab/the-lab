
import db from '../../db';

/******************************************************************************/

const QUERY = `
SELECT id, name
  FROM test
 LIMIT 10
`;

/******************************************************************************/

export default (req, res) => db.query(QUERY)
  .then(({ rows }) => res.send(rows));
