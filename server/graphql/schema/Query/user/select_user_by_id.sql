
SELECT id,
       firstname,
       lastname
  FROM users
 WHERE id = $1
