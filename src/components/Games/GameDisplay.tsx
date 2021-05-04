import dotenv from 'dotenv';
dotenv.config();
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Reviews from './Reviews';
const { REACT_APP_CLIENT_ID } = process.env;

type Option = {
  id: string;
  name: string;
  url: string;
};

// type Review = {
//     username: string;
//     rating: number;
//     review: string;
// };

type ThumbGame = {
  game_id: string;
  name: string;
  thumb_url: string;
  avgRating: number;
};

type GameDispProps = {
  location: { state: ThumbGame };
  mechanics: Option[];
  categories: Option[];
};

const GameDisplay: React.FC<GameDispProps> = (props: GameDispProps): JSX.Element => {
  // const [reviews, setReviews] = useState<Review[]>([]);
  const [yearPublished, setYearPublisehd] = useState('');
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [minAge, setMinAge] = useState('');
  const [mechanics, setMechanics] = useState('');
  const [categories, setCategories] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { game_id, name, avgRating } = props.location.state;

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
          props.mechanics.forEach((mecLib: Option) => {
            if (mecLib.id === searchResMec.id) {
              mechanicsProcessed[ind] = mecLib.name;
            }
          });
        });
        categoriesProcessed.forEach((searchResCat: { id: string; url: string }, ind: number) => {
          props.categories.forEach((catLib: Option) => {
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
        <p className="game-info">{description}</p>
        <div className="game-rating">Average Rating:{avgRating}</div>
      </div>
      {/* <div className="game-reviews">{props.reviews}</div> */}
      <img src={imageUrl} className="game-images" alt={name} />
      <p>{yearPublished}</p>
      <p>{categories}</p>
      <p>{mechanics}</p>
      <p>{minPlayers}</p>
      <p>{maxPlayers}</p>
      <p>{minAge}</p>
      {/* <Reviews reviews={reviews} /> */}
    </div>
  );
};

export default GameDisplay;
