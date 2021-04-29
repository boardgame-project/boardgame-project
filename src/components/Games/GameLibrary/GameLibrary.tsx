import React, {useState, useEffect} from 'react';
import axios from 'axios';

import SearchBar from '../SearchBar/SearchBar';
import GameBox from '../GameBox/GameBox';


const GameLibrary: React.FC = () => {

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

  const [games, setGames] = useState([]);

  useEffect(():void => {
    getGames()
  });

  const getGames = ():void => {
    axios.get('/api/game')
    .then(res => {
      const gamesArray = res.data
      console.log(res.data)
      setGames(gamesArray)
    }).catch(err => console.log(err))
  };

  const mappedGames = games.map((elem: Game, id: number) => {
    return <div key={id}>
      <GameBox {...elem}></GameBox>
    </div>
  })

  return (
  <div className='gameLibrary'>
    <SearchBar/>
    {mappedGames}
  </div>)
}

export default GameLibrary