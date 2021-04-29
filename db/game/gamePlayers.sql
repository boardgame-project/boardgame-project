SELECT
  *
FROM
  user_games ug
  JOIN users u ON u.user_id = ug.user_id
WHERE
  ug.game_id = $1;

