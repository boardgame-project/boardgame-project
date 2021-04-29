import React from 'react';
import {Link} from 'react-router-dom';

type Game = {
  game_id: string,
  name: string, 
  year_published: string, 
  min_players: number,
  max_players: number,
  min_age: number,
  mechanics: string,
  categoties: string,
  description: string,
  image_url: string, 
  thumb_url: string
}

const GameBox: React.FC<Game> = (props: Game):JSX.Element => {

  

  return (
    <div className='gameBox'>
      <Link to={`/game/${props.game_id}`}>
        <img src={props.image_url}/>
        <h3>{props.name}</h3>
        {/* <h4>rating from db</h4> */}
      </Link>

    </div>)
}

export default GameBox