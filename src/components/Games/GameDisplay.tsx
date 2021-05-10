import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { GameDispProps, Option } from 'customTypes';
import HTMLReactParser from 'html-react-parser';
import Reviews from './Reviews';
import Rating from '../StyledComponents/Rating';

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
    getGameDetails();
  });

  const getGameDetails = async (): Promise<void> => {
    await axios
      .get(
        `https://api.boardgameatlas.com/api/search?ids=${id}&fields=year_published,min_players,max_players,min_age,mechanics,categories,description,image_url&client_id=${REACT_APP_CLIENT_ID}`
      )
      .then((res) => {
        const { year_published, min_players, max_players, min_age, image_url, description, mechanics, categories } =
          res.data.games[0];

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
      <img src={imageUrlState} className="game-images" alt={name} />
      {avgRating === -1 ? <h5>Not Yet Reviewed</h5> : <Rating rating={avgRating} />}
      <section className="game-info-container">
        <h2 className="game-name">{name}</h2>
        <p className="game-info">{HTMLReactParser(descriptionState)}</p>
      </section>
      <section className="game-info-row">
        <h5>year published-</h5>
        {` ${yearPublishedState}`}
      </section>
      <br />
      <section className="game-info-container">
        <h5>categories:</h5>
        <div className="mecCatBox">{categoriesState.toLowerCase()}</div>
      </section>
      <br />
      <section className="game-info-container">
        <h5>mechanics:</h5>
        <div className="mecCatBox">{mechanicsState.toLowerCase()}</div>
      </section>
      <section className="game-info-row">
        <h5>min players-</h5>
        {` ${minPlayersState}`}
      </section>
      <section className="game-info-row">
        <h5>max players-</h5>
        {` ${maxPlayersState}`}
      </section>
      <section className="game-info-row">
        <h5>min age-</h5>
        {` ${minAgeState}`}
      </section>
      <Reviews game_id={id} />
    </div>
  );
};

export default GameDisplay;
