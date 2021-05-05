import dotenv from 'dotenv';
dotenv.config();
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../Header/Hero';
import SearchBar from './SearchBar';
import GameBox from './GameBox';
import { GameRatings, ThumbGame } from 'customTypes';

const { REACT_APP_CLIENT_ID } = process.env;

const GameLibrary: React.FC = () => {
  const [gRatings, setGameRatings] = useState<GameRatings>([
    {
      game_id: '',
      average_rating: 0
    }
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchResults, setSearchResults] = useState<ThumbGame[]>([]);

  useEffect(() => {
    getGameRatings();
  }, []);

  const getGameRatings = async (): Promise<void> => {
    await axios.get('/api/game/ratings').then((res) => {
      const ratingsArray: GameRatings = res.data;
      setGameRatings(ratingsArray);
    });
  };

  const getAPIGames = async (
    searchEntry: string,
    mechanicsSelections: string[],
    categoriesSelections: string[],
    itemsPerPage: string
  ): Promise<void> => {
    console.log(itemsPerPage, 'axios');
    const skip = Number.parseInt(itemsPerPage) * currentPage;
    //prettier-ignore
    await axios.get(`https://api.boardgameatlas.com/api/search?fuzzy_match=true${searchEntry ? `&name=${encodeURI(searchEntry)}` : ''}${mechanicsSelections.length !== 0 ? `&mechanics=${mechanicsSelections.join(',')}` : ''}${categoriesSelections.length !== 0 ? `&categories=${categoriesSelections.join(',')}` : ''}${skip !== 0 ? `&skip=${skip.toString()}` : ''}&limit=${itemsPerPage}&fields=id,name,thumb_url&client_id=${REACT_APP_CLIENT_ID}`)
    // 
    .then((res) => {
      const apiGames: ThumbGame[] = res.data.games;
      console.log(res.data.games);
      apiGames.forEach((game, ind) => {
        gRatings.forEach((rating) => {
          game.id === rating.game_id
            ? (apiGames[ind].avgRating = rating.average_rating)
            : (apiGames[ind].avgRating = -1);
        });
      });
      console.dir(apiGames)
      return setSearchResults(apiGames);
    });
  };

  const mappedGames = searchResults.map((elem: ThumbGame, id: number) => {
    return (
      <div key={id}>
        <GameBox thumbGame={elem}></GameBox>
      </div>
    );
  });

  return (
    <div className="gameLibrary">
      <Hero />
      <SearchBar getAPIGames={getAPIGames} />
      {mappedGames}
      <div className="willEventuallyBeForwardArrow" onClick={() => setCurrentPage(currentPage + 1)}></div>
      <div className="willEventuallyBeBackwardArrow" onClick={() => setCurrentPage(currentPage - 1)}></div>
    </div>
  );
};

export default GameLibrary;
