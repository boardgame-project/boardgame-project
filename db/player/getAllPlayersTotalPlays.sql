SELECT
  user_id,
  SUM(play_count) total
FROM
  user_games
GROUP BY
  user_id
ORDER BY
  total DESC;

