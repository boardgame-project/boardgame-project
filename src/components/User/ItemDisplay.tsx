import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserGameProps } from 'customTypes';
import Button from '../StyledComponents/Button';
import HTMLReactParser from 'html-react-parser';
import mechCatProcessor from '../mechCatProccessor';
import Rating from '../StyledComponents/Rating';
import { getUserGames } from '../../redux/userGameReducer';
import { RouteComponentProps } from 'react-router-dom';

const ItemDisplay: React.FC<UserGameProps & RouteComponentProps> = (
  props: UserGameProps & RouteComponentProps
): JSX.Element => {
  // const user = useSelector((state: RootState) => state.userReducer);
  const [gameID] = useState(props.location.state.userGame.game_id);
  const [yearPublished] = useState(props.location.state.userGame.year_published);
  const [minPlayers] = useState(props.location.state.userGame.min_players);
  const [maxPlayer] = useState(props.location.state.userGame.max_players);
  const [minAge] = useState(props.location.state.userGame.min_age);
  const [mechanics] = useState(props.location.state.userGame.mechanics);
  const [categories] = useState(props.location.state.userGame.categories);
  const [mechanicsProc, setMechanicsProc] = useState('');
  const [categoriesProc, setCategoriesProc] = useState('');
  const [description] = useState(props.location.state.userGame.description);
  const [imageUrl] = useState(props.location.state.userGame.image_url);
  const [name] = useState(props.location.state.userGame.name);
  const [playCount, setPlayCount] = useState(props.location.state.userGame.play_count);
  const [rating, setRating] = useState(props.location.state.userGame.rating);
  const [addEdit, setAddEdit] = useState(false);
  const [input, setInput] = useState<string>('');
  const [editing, setEditing] = useState(false);

  const mechanicsLib = useSelector((state: RootState) => state.meccatReducer.mechanic);
  const categoriesLib = useSelector((state: RootState) => state.meccatReducer.category);

  const dispatch = useDispatch();

  useEffect((): void => {
    getReview();
    const { mechanicsProcessed, categoriesProcessed } = mechCatProcessor(
      mechanics,
      categories,
      mechanicsLib,
      categoriesLib
    );
    setMechanicsProc(mechanicsProcessed);
    setCategoriesProc(categoriesProcessed);
  }, []);

  const increasePlayCount = () => {
    axios
      .put(`/api/usergame/inccount/${gameID}`)
      .then((res) => setPlayCount(res.data.play_count))
      .catch((err) => console.log(err));
  };
  const decreasePlayCount = () => {
    axios
      .put(`/api/usergame/deccount/${gameID}`)
      .then((res) => setPlayCount(res.data.play_count))
      .catch((err) => console.log(err));
  };
  const removeGame = () => {
    axios.delete(`/api/usergame/${gameID}`).then(() => {
      dispatch(getUserGames());
      props.history.push('/user');
    });
  };

  // {
  //   rating;
  // }
  const modRating = (type: string) => {
    switch (type) {
      case 'inc':
        return axios
          .put('/api/usergame/rating', { gameID, rating: rating + 1 })
          .then((res: AxiosResponse<{ rating: string }>) => {
            setRating(res.data.rating);
          })
          .catch((err: AxiosError) => console.log(err));
      case 'dec':
        return axios
          .put('/api/usergame/rating', { gameID, rating: rating - 1 })
          .then((res: AxiosResponse<{ rating: string }>) => {
            setRating(res.data.rating);
          })
          .catch((err: AxiosError) => console.log(err));
      default:
        break;
    }
  };
  const postReview = () => {
    axios.put(`/api/usergame/review`, { gameID, review: input });
  };

  const getReview = (): void => {
    axios
      .get(`/api/player/reviews/${gameID}`)
      .then((res: AxiosResponse<[{ review: string | null }]>) => {
        setInput(res.data[0].review ? res.data[0].review : '');
        res.data[0].review ? setAddEdit(true) : setAddEdit(false);
      })
      .catch((err) => console.log(err));
  };

  const toggleEditing = (e: SyntheticEvent) => {
    e.preventDefault();
    if (editing) {
      setEditing(false);
      postReview();
      getReview();
    } else {
      setEditing(true);
    }
  };

  return (
    <div className="game-display-page">
      <section className="image-And-Rating">
        <img className="game-images" src={imageUrl} />
        <br />
        <section className="playCountContainer">
          <h4>Play Count:</h4>
          <div id="counterBox">
            <Button className="addRemPlay" onClick={() => decreasePlayCount()}>
              -
            </Button>
            <div id="playCtNum">{playCount} </div>
            <Button className="addRemPlay" onClick={() => increasePlayCount()}>
              +
            </Button>
          </div>
        </section>
        <br />
        <div id="ratingReviewContainer">
          <div id="ratingChanger">
            <Button className="addRemRating" onClick={() => modRating('dec')}>
              -
            </Button>
            <Rating rating={rating} />
            <Button className="addRemRating" onClick={() => modRating('inc')}>
              +
            </Button>
          </div>
          <textarea
            className="input"
            role="textbox"
            rows={5}
            id="review"
            value={input}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setInput(e.target.value)}
            placeholder="write review here"
            name="review"
            disabled={!editing}></textarea>
        </div>
        <br />
        <Button onClick={(e) => toggleEditing(e)}>{editing ? 'submit' : addEdit ? 'edit review' : 'add review'}</Button>

        <br />
        <h2>{name}</h2>
        <section className="game-info-row">
          <h4>players-</h4>
          {` ${minPlayers} to ${maxPlayer}`}
        </section>
        <section className="game-info-row">
          <h4>Minimum Age</h4> -{minAge}
        </section>
        <section className="game-info-container">{HTMLReactParser(description)}</section>
        <section>
          <h4>Mechanics</h4>
          {mechanicsProc}
        </section>
        <section>
          <h4>Categories</h4>
          {categoriesProc}
        </section>
        <section className="game-info-container">
          <h4>Year Published:</h4> {yearPublished}
        </section>
        <Button className="removeButton" onClick={removeGame}>
          remove game
        </Button>
      </section>
      <form onSubmit={toggleEditing}></form>
      <br />
    </div>
  );
};

export default ItemDisplay;
