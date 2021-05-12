SELECT
  email
FROM
  user_info
WHERE
  reset_token = $1;

