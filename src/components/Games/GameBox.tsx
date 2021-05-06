import { GameBoxProps } from 'customTypes';
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../StyledComponents/Rating';

const GameBox: React.FC<GameBoxProps> = (props: GameBoxProps): JSX.Element => {
  const { id, name, thumb_url, avgRating } = props.thumbGame;
  console.log(avgRating);
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
        <Rating rating={avgRating} />
      </Link>
    </div>
  );
};

export default GameBox;
