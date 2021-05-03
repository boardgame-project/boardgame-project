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
  }];

  type thumbGame = {
    game_id: string,
    name: string, 
    thumb_url: string,
    avgRating: number
  }; 

  
  const [gRatings, setGameRatings] = useState<gameRatings>([{game_id:"", average_rating:0}]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<thumbGame[]>([])

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
    await axios.get(`https://api.boardgameatlas.com/api/search?limit=fuzzy_match=true&name=${encodeURI(searchEntry)}&mechanics=${mechanicsSelections.join(',')}&categories=${categoriesSelections.join(',')}&limit=${itemsPerPage}&skip=${skip.toString()}&fields=game_id,name,thumb_url&client_id=${CLIENT_ID}`)
    .then(res => {
      const apiGames:thumbGame[] = res.data.games
      apiGames.forEach((game, ind)=> {
        gRatings.forEach((rating)=> game.game_id === rating.game_id ? apiGames[ind].avgRating = rating.average_rating : apiGames[ind].avgRating = 0)
      })
      setSearchResults(apiGames);
    })
  }

  const mappedGames = searchResults.map((elem: thumbGame, id: number) => {

    return <div key={id}>
      <GameBox {...elem}></GameBox>
    </div>
  })

  return (
  <div className='gameLibrary'>
    <Hero />
    <SearchBar getAPIGames={getAPIGames}/>
    {mappedGames}
    <div className="willEventuallyBeForwardArrow" onClick={() => setCurrentPage(currentPage+1)}></div>
    <div className="willEventuallyBeBackwardArrow" onClick={() => setCurrentPage(currentPage-1)}></div>
  </div>)
}

export default GameLibrary