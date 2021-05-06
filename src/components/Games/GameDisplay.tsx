import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GameDispProps, Option } from 'customTypes';
import HTMLReactParser from 'html-react-parser';

const { REACT_APP_CLIENT_ID } = process.env;

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

  const { id, name, avgRating } = props.location.state.thumbGame;
  const mechanicsLib = useSelector((state: RootState) => state.meccatReducer.mechanic);
  const categoriesLib = useSelector((state: RootState) => state.meccatReducer.category);

  useEffect((): void => {
    // getGameReviews();
    getGameDetails();
  });

  // const getGameReviews = (): void => {
  //     axios.get(`/api/game/review/:${id}`).then((res) => {
  //         setReviews(res.data);
  //     });
  // };

  const getGameDetails = async (): Promise<void> => {
    await axios
      .get(
        `https://api.boardgameatlas.com/api/search?ids=${id}&fields=year_published,min_players,max_players,min_age,mechanics,categories,description,image_url&client_id=${REACT_APP_CLIENT_ID}`
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
              categoriesProcessed[ind] = catLib.name;
            }
          });
        });
        setMechanics(mechanicsProcessed.join(','));
        setCategories(categoriesProcessed.join(','));
      });
  };

  return (
    <div className="game-display-page">
      <div className="game-info-container">
        <h1 className="game-name">{name}</h1>
        <div className="game-info">{HTMLReactParser(descriptionState)}</div>
        <div className="game-rating">Average Rating:{avgRating === -1 ? 'Not Reviewed' : avgRating}</div>
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
