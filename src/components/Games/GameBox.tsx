import { GameBoxProps } from 'customTypes';
import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../StyledComponents/Rating';

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
        {avgRating === -1 ? <h4>Not Yet Reviewed</h4> : <Rating rating={avgRating} />}
      </Link>
    </div>
  );
};

export default GameBox;
