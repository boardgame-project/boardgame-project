import { GameBoxProps } from 'customTypes';
import React from 'react';
import { Link } from 'react-router-dom';


const GameBox: React.FC<GameBoxProps> = (props: GameBoxProps): JSX.Element => {
  const { game_id, name, thumb_url, avgRating } = props.thumbGame;
  return (
    <div className="gameBox">
      <Link to={`/game/${game_id}`}>
        <img src={thumb_url} />
        <h3>{name}</h3>
        <h4>{avgRating}</h4>
      </Link>
    </div>
  );
};

export default GameBox;
