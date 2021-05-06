import React from 'react';
// import {Link} from 'react-router-dom';
import { UserGame } from '../../redux/userGameReducer';

const ShelfItem: React.FC<UserGame> = (props: UserGame): JSX.Element => {
  // id, name, thumb_url, play_count, description, mechanics, categories, rating, review, min_age, min_players, max_players, year_published
  console.log(props);
  return <div className="shelfItemBox"></div>;
};

export default ShelfItem;
