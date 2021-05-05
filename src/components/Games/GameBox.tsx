import { GameBoxProps } from 'customTypes';
import React from 'react';
import { Link } from 'react-router-dom';

const GameBox: React.FC<GameBoxProps> = (props: GameBoxProps): JSX.Element => {
  const { id, name, thumb_url, avgRating } = props.thumbGame;
  return (
    <div className="gameBox">
      <Link
        to={{
          pathname: `/game/${id}`,
          state: {
            thumbGame: props.thumbGame
          }
        }}>
        <img src={thumb_url} />
        <h3>{name}</h3>
        <h4>{avgRating === -1 ? 'Not Reviewed' : avgRating}</h4>
      </Link>
    </div>
  );
};

export default GameBox;
