
import SELECT_USERS from './select_user_by_id.sql';

export default async (root, { id }, { postgres }) => (
  postgres.query(SELECT_USERS, [id])
    .then(({ rows }) => rows[0])
);
