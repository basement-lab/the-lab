
import SELECT_USERS from './select_users.sql';

export default async (root, { first, after }, { postgres }) => (
  postgres.query(SELECT_USERS, [
    first,
    after,
  ])
    .then(({ rows }) => rows)
);
