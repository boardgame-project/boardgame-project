import React from 'react';
import {Link} from 'react-router-dom';
// import axios from 'axios';

type thumbGame = {
  game_id: string,
  name: string, 
  thumb_url: string,
  avgRating: number
} 

const GameBox: React.FC<thumbGame> = (props: thumbGame):JSX.Element => {


  return (
    <div className='gameBox'>
      <Link to={`/game/${props.game_id}`}>
        <img src={props.thumb_url}/>
        <h3>{props.name}</h3>
        <h4>{props.avgRating}</h4>
      </Link>

    </div>)
}

export default GameBox