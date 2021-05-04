import dotenv from 'dotenv';
dotenv.config();
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../Header/Hero';
import SearchBar from './SearchBar';
import GameBox from './GameBox';

const { REACT_APP_CLIENT_ID } = process.env;

type Option = {
  id: string;
  name: string;
  url: string;
};

type GameLibProps = {
  mechanics: Option[];
  categories: Option[];
};

type GameRatings = [
  {
    game_id: string;
    average_rating: number;
  }
];

type ThumbGame = {
  game_id: string;
  name: string;
  thumb_url: string;
  avgRating: number;
};

const GameLibrary: React.FC<GameLibProps> = (props: GameLibProps) => {
  const [gRatings, setGameRatings] = useState<GameRatings>([{ game_id: '', average_rating: 0 }]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchResults, setSearchResults] = useState<ThumbGame[]>([]);

  useEffect(() => {
    getGameRatings();
  }, []);

  const getGameRatings = async (): Promise<void> => {
    await axios.get('/api/game/ratings').then((res) => {
      const ratingsArray: GameRatings = res.data;
      console.log(res.data);
      setGameRatings(ratingsArray);
    });
  };

  const getAPIGames = async (
    searchEntry: string,
    mechanicsSelections: string[],
    categoriesSelections: string[],
    itemsPerPage: string
  ): Promise<void> => {
    const skip = Number.parseInt(itemsPerPage) * currentPage;
    await axios
      .get(
        `https://api.boardgameatlas.com/api/search?fuzzy_match=true&name=${encodeURI(
          searchEntry
        )}&mechanics=${mechanicsSelections.join(',')}&categories=${categoriesSelections.join(
          ','
        )}&limit=${itemsPerPage}&skip=${skip.toString()}&fields=game_id,name,thumb_url&client_id=${REACT_APP_CLIENT_ID}`
      )
      .then((res) => {
        const apiGames: ThumbGame[] = res.data.games;
        apiGames.forEach((game, ind) => {
          gRatings.forEach((rating) => {
            if (game.game_id === rating.game_id) {
              apiGames[ind].avgRating = rating.average_rating;
            }
          });
        });
        setSearchResults(apiGames);
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
      <SearchBar mechanics={props.mechanics} categories={props.categories} getAPIGames={getAPIGames} />
      {mappedGames}
      <div className="willEventuallyBeForwardArrow" onClick={() => setCurrentPage(currentPage + 1)}></div>
      <div className="willEventuallyBeBackwardArrow" onClick={() => setCurrentPage(currentPage - 1)}></div>
    </div>
  );
};

export default GameLibrary;
