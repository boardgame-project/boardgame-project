import React from 'react';
// import {Link} from 'react-router-dom';
import { UserGame } from '../../redux/userGameReducer';



const ShelfItem: React.FC<UserGame> = (props: UserGame): JSX.Element => {
  console.log(props)
  // id, name, thumb_url, play_count, description, mechanics, categories, rating, review, min_age, min_players, max_players, year_published  



  return (
    <section className='shelfItemBox'>
      <h3>{props.name}</h3>
      <img src={props.image_url} />
      <div>
        <h4>play stats</h4>
        <p>{props.play_count}</p>
        <p>{props.rating}</p>
      </div>
    </section>)
}

export default ShelfItem