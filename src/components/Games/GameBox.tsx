import React from 'react';
import { Link } from 'react-router-dom';

type ThumbGame = {
  game_id: string;
  name: string;
  thumb_url: string;
  avgRating: number;
};

const GameBox: React.FC<{ thumbGame: ThumbGame }> = (props: { thumbGame: ThumbGame }): JSX.Element => {
  const { game_id, name, thumb_url, avgRating } = props.thumbGame;

  return (
    <div className="gameBox">
      <Link
        to={{
          pathname: `/game/${game_id}`,
          state: {
            thumbGame: props.thumbGame
          }
        }}>
        <img src={thumb_url} />
        <h3>{name}</h3>
        <h4>{avgRating}</h4>
      </Link>
    </div>
  );
};

export default GameBox;
