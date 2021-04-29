// import React, {useState, useEffect} from 'react';
import React from 'react';

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


  return (<></>)
}

export default GameBox