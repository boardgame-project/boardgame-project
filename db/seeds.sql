DROP TABLE user_games;

DROP TABLE users;

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
  game_id text,
  play_count int,
  rating int,
  review text
);

-- Test Data
INSERT INTO users (first_name, last_name, email)
  VALUES ('a', 'a', 'a'), ('b', 'b', 'b'), ('c', 'c', 'c'), ('d', 'd', 'd');

INSERT INTO user_games (game_id, user_id, play_count, rating)
  VALUES ('0Z20rVZ9GQ', 5, 10, 2), ('kM98P8Iplw', 5, 1, 3), ('0Z20rVZ9GQ', 5, 4, 4), ('0Z20rVZ9GQ', 6, 8, 5), ('kM98P8Iplw', 6, 9, 4), ('0Z20rVZ9GQ', 6, 20, 3), ('kM98P8Iplw', 7, 21, 2), ('kM98P8Iplw', 7, 13, 1), ('0Z20rVZ9GQ', 7, 5, 4), ('2lIAkSns4o', 7, 9, 5), ('0Z20rVZ9GQ', 8, 20, 2), ('kM98P8Iplw', 8, 15, 4), ('0Z20rVZ9GQ', 8, 25, 3), ('2lIAkSns4o', 8, 23, 2);

