import React from 'react';
import { Link } from 'react-router-dom';

type Option = {
  id: string;
  name: string;
  url: string;
};

type ThumbGame = {
  game_id: string;
  name: string;
  thumb_url: string;
  avgRating: number;
};

type GameBoxProps = {
  mechanics: Option[];
  categories: Option[];
  thumbGame: ThumbGame;
};

const GameBox: React.FC<GameBoxProps> = (props: GameBoxProps): JSX.Element => {
  const { game_id, name, thumb_url, avgRating } = props.thumbGame;
  const { mechanics, categories } = props;

  return (
    <div className="gameBox">
      <Link
        to={{
          pathname: `/game/${game_id}`,
          state: {
            thumbGame: props.thumbGame,
            mechanics,
            categories
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
