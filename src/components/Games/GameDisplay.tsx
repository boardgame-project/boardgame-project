import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
// import Reviews from './Reviews';
import dotenv from 'dotenv';
dotenv.config();
const { REACT_APP_CLIENT_ID } = process.env;

// type Review = {
//     username: string;
//     rating: number;
//     review: string;
// };
type Option = {
  id: string;
  name: string;
  url: string;
};
type ThumbGame = {
  game_id: string;
  name: string;
  thumb_url: string;
  avgRating: number;
};

type GameDispProps = {
  thumbGame: ThumbGame;
};

const GameDisplay: React.FC<GameDispProps> = (props: GameDispProps): JSX.Element => {
  // const [reviewsState, setReviews] = useState<Review[]>([]);
  const [yearPublishedState, setYearPublisehd] = useState('');
  const [minPlayersState, setMinPlayers] = useState('');
  const [maxPlayersState, setMaxPlayers] = useState('');
  const [minAgeState, setMinAge] = useState('');
  const [mechanicsState, setMechanics] = useState('');
  const [categoriesState, setCategories] = useState('');
  const [descriptionState, setDescription] = useState('');
  const [imageUrlState, setImageUrl] = useState('');

  const { game_id, name, avgRating } = props.thumbGame;
  const mechanicsLib = useSelector((state: RootState) => state.meccatReducer.mechanic);
  const categoriesLib = useSelector((state: RootState) => state.meccatReducer.category);

  useEffect((): void => {
    // getGameReviews();
    getGameDetails();
  });

  // const getGameReviews = (): void => {
  //     axios.get(`/api/game/review/:${game_id}`).then((res) => {
  //         setReviews(res.data);
  //     });
  // };

  const getGameDetails = async (): Promise<void> => {
    await axios
      .get(
        `https://api.boardgameatlas.com/api/search?ids=${game_id}&fields=year_published,min_players,max_players,min_age,mechanics,categories,description,image_url&client_id=${REACT_APP_CLIENT_ID}`
      )
      .then((res) => {
        const {
          year_published,
          min_players,
          max_players,
          min_age,
          image_url,
          description,
          mechanics,
          categories
        } = res.data.games[0];

        setYearPublisehd(year_published);
        setMinPlayers(min_players);
        setMaxPlayers(max_players);
        setMinAge(min_age);
        setImageUrl(image_url);
        setDescription(description);

        const mechanicsProcessed = mechanics;
        const categoriesProcessed = categories;

        mechanicsProcessed.forEach((searchResMec: { id: string; url: string }, ind: number) => {
          mechanicsLib.forEach((mecLib: Option) => {
            if (mecLib.id === searchResMec.id) {
              mechanicsProcessed[ind] = mecLib.name;
            }
          });
        });
        categoriesProcessed.forEach((searchResCat: { id: string; url: string }, ind: number) => {
          categoriesLib.forEach((catLib: Option) => {
            if (catLib.id === searchResCat.id) {
              mechanicsProcessed[ind] = catLib.name;
            }
          });
        });

        setMechanics(mechanicsProcessed);
        setCategories(categoriesProcessed);
      });
  };

  return (
    <div className="game-display-page">
      <div className="game-info-container">
        <h1 className="game-name">{name}</h1>
        <p className="game-info">{descriptionState}</p>
        <div className="game-rating">Average Rating:{avgRating}</div>
      </div>
      {/* <div className="game-reviews">{props.reviews}</div> */}
      <img src={imageUrlState} className="game-images" alt={name} />
      <p>{yearPublishedState}</p>
      <p>{categoriesState}</p>
      <p>{mechanicsState}</p>
      <p>{minPlayersState}</p>
      <p>{maxPlayersState}</p>
      <p>{minAgeState}</p>
      {/* <Reviews reviews={reviewsState} /> */}
    </div>
  );
};

export default GameDisplay;
