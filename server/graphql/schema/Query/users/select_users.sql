SELECT id,
       firstname,
       lastname
  FROM users
 ORDER BY id ASC
 LIMIT $1
OFFSET $2
