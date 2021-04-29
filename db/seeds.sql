CREATE TABLE users (
  user_id serial PRIMARY KEY,
  first_name text,
  last_name text,
  hash text,
  email text
);

CREATE TABLE user_games (
  id serial PRIMARY KEY,
  user_id int REFERENCES users (user_id),
  game_id int,
  play_count int,
  rating int,
  review text
);

