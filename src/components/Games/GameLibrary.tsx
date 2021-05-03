import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Hero from '../Header/Hero';
import SearchBar from './SearchBar';
import GameBox from './GameBox';
const { CLIENT_ID } = process.env;


const GameLibrary: React.FC = () => {


  type gameRatings = [{
    game_id:string,
    average_rating: number
  }]

  type thumbnailGame = {
    
  }

  
  const [ratings, setGameRatings] = useState([{game_id:"",
    average_rating: 0}]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getGameRatings();
  },[]);

  const getGameRatings = async ():Promise<void> => {
    await axios.get('/api/game/ratings')
    .then(res => {
      const ratingsArray:gameRatings = res.data
      console.log(res.data)
      setGameRatings(ratingsArray)
    })
  };


  const getAPIGames = async (searchEntry:string, mechanicsSelections:string[], categoriesSelections:string[], itemsPerPage:string):Promise<void> => {
    const skip = Number.parseInt(itemsPerPage)*currentPage; 
    axios.get(`https://api.boardgameatlas.com/api/search?limit=fuzzy_match=true&name=${encodeURI(searchEntry)}&mechanics=${mechanicsSelections.join(',')}&categories=${categoriesSelections.join(',')}&limit=${itemsPerPage}&skip=${skip.toString()}client_id=${CLIENT_ID}`)
    .then()
  }

  const mappedGames = games.map((elem: Game, id: number) => {
    return <div key={id}>
      <GameBox {...elem, ...{ratings}}></GameBox>
    </div>
  })

  return (
  <div className='gameLibrary'>
    <Hero />
    <SearchBar getAPIGames={getAPIGames}/>
    {mappedGames}
  </div>)
}

export default GameLibrary