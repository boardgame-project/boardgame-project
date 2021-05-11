import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { GameDispProps } from 'customTypes';
import HTMLReactParser from 'html-react-parser';
import Reviews from './Reviews';
import Rating from '../StyledComponents/Rating';
import Button from '../StyledComponents/Button';
import { UserGame, getUserGames } from '../../redux/userGameReducer';
import mechCatProcessor from '../mechCatProccessor';

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
  const [inList, setInList] = useState(false);

  const { id, name, avgRating } = props.location.state.thumbGame;
  const email = useSelector((state: RootState) => state.userReducer.email);
  const userGames = useSelector((state: RootState) => state.userGameReducer.userGames);

  const mechanicsLib = useSelector((state: RootState) => state.meccatReducer.mechanic);
  const categoriesLib = useSelector((state: RootState) => state.meccatReducer.category);

  const dispatch = useDispatch();

  useEffect((): void => {
    getGameDetails();
    determineGameAdded();
  }, []);

  const determineGameAdded = () => {
    const found = userGames.reduce((accum: number, el: UserGame) => (el.game_id === id ? ++accum : accum), 0);
    if (found) {
      setInList(true);
    }
  };

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

        const { mechanicsProcessed, categoriesProcessed } = mechCatProcessor(
          mechanics,
          categories,
          mechanicsLib,
          categoriesLib
        );

        setMechanics(mechanicsProcessed);
        setCategories(categoriesProcessed);
      });
  };

  const addRemoveGame = async (addRemove: string): Promise<void> => {
    switch (addRemove) {
      case 'remove':
        return await axios.delete(`/api/usergame/${id}`).then(() => {
          setInList(false);
          dispatch(getUserGames());
        });
      case 'add':
        return await axios.post(`/api/usergame/${id}`).then(() => {
          setInList(true);
          dispatch(getUserGames());
        });
      default:
        break;
    }
  };

  return (
    <div className="game-display-page">
      <main className="pic-And-Game-Info">
        <div className="image-And-Rating">
          <img src={imageUrlState} className="game-images" alt={name} />
          {avgRating === -1 ? <h5>Not Yet Reviewed</h5> : <Rating rating={avgRating} />}
          <br />
          <Button
            onClick={() => addRemoveGame(inList ? 'remove' : 'add')}
            style={email ? { display: 'inline-block' } : { display: 'none' }}>
            {inList ? 'remove game' : 'add game'}
          </Button>
        </div>
        <div className="game-info-container">
          <h3 className="game-name">{name}</h3>
          <section className="game-info-row">
            <h5>players-</h5>
            {` ${minPlayersState} to ${maxPlayersState}`}
          </section>
          <section className="game-info-row">
            <h5>minimum age-</h5>
            {` ${minAgeState}`}
          </section>
          <br />
          <section className="game-info-column">
            <h5>categories:</h5>
            <div className="mecCatBox">{categoriesState.toLowerCase()}</div>
          </section>
          <br />
          <section className="game-info-column">
            <h5>mechanics:</h5>
            <div className="mecCatBox">{mechanicsState.toLowerCase()}</div>
          </section>
          <section className="game-info-column">
            <p className="game-description">{HTMLReactParser(descriptionState)}</p>
          </section>
          <section className="game-info-row">
            <h5>year published-</h5>
            {` ${yearPublishedState}`}
          </section>
        </div>
      </main>
      <Reviews game_id={id} />
    </div>
  );
};

export default GameDisplay;
