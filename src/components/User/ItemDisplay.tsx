import axios, { AxiosResponse } from 'axios';
import React, { useState, useEffect, SyntheticEvent } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
import { UserGameProps } from 'customTypes';
import Button from '../StyledComponents/Button';
import HTMLReactParser from 'html-react-parser';

const ItemDisplay: React.FC<UserGameProps> = (props: UserGameProps): JSX.Element => {
  // const user = useSelector((state: RootState) => state.userReducer);
  const [gameID] = useState(props.location.state.userGame.game_id);
  const [yearPublished] = useState(props.location.state.userGame.year_published);
  const [minPlayers] = useState(props.location.state.userGame.min_players);
  const [maxPlayer] = useState(props.location.state.userGame.max_players);
  const [minAge] = useState(props.location.state.userGame.min_age);
  // const [mechanics, setMechanics] = useState(props.location.state.userGame.mechanics);
  // const [categories, setCategories] = useState(props.location.state.userGame.categories);
  const [description] = useState(props.location.state.userGame.description);
  const [imageUrl] = useState(props.location.state.userGame.image_url);
  const [name] = useState(props.location.state.userGame.name);
  const [playCount] = useState(props.location.state.userGame.play_count);
  const [rating] = useState(props.location.state.userGame.rating);
  const [addEdit, setAddEdit] = useState(false);
  const [input, setInput] = useState<string>('');
  const [editing, setEditing] = useState(false);

  useEffect((): void => {
    getReview();
  }, []);

  const postReview = () => {
    axios.put(`/api/usergame/review`, { gameID, review: input });
  };

  const getReview = (): void => {
    axios
      .get(`/api/player/reviews/${gameID}`)
      .then((res: AxiosResponse<[{ review: string }]>) => {
        setInput(res.data[0].review);
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
    <div>
      <section>
        <h2>{name}</h2>
        <img src={imageUrl} />
        <p>Year Published:{yearPublished}</p>
        <p>Minimun Player:{minPlayers}</p>
        <p>Maximum Age:{maxPlayer}</p>
        <p>Minimum Age:{minAge}</p>
        {HTMLReactParser(description)}
        {/* <p>{mechanics}</p>
        <p>{categories}</p> */}
        <p>Play Count:{playCount}</p>
        <p>Your Rating:{rating}</p>
      </section>
      <form onSubmit={toggleEditing}>
        <label htmlFor="reviews-box">Reviews:</label>
        <textarea
          id="review"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setInput(e.target.value)}
          placeholder="write review here"
          name="review"
          disabled={!editing}
          className={!editing ? 'deactivated' : ''}
        />
        <div>
          <Button onClick={(e) => toggleEditing(e)}>
            {editing ? 'submit' : addEdit ? 'edit review' : 'add review'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ItemDisplay;
