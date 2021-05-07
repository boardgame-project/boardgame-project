import React from 'react';
import {Link} from 'react-router-dom';
import { UserGame } from '../../redux/userGameReducer';
import Rating from '../StyledComponents/Rating';

const ShelfItem: React.FC<UserGame> = (props: UserGame): JSX.Element => {

  // console.log(props)
  

  return (
      <section className='shelfItemBox'>
        <div className='nameFlex'>
          <h3>{props.name}</h3>
        </div>
          <div className='shelfItemFlex'>
            <Link to='/' className='linkContainer'>
              <div className='overlay'>
                <p className='infoText'>info</p>
              </div>
              <img className='shelfImage' src={props.image_url} />
            </Link>
            <div className='stats'>
              <h4>play stats</h4>
              <p>play count: {props.play_count}</p>
              <p>rating: {props.rating}</p>
              <Rating rating={props.rating}></Rating>
            </div>
        </div>
        </section>
    
  )
};

export default ShelfItem;
