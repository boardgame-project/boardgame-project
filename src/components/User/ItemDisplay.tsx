import axios from 'axios';
import React, { useState, useEffect, SyntheticEvent } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
import { UserGameProps } from 'customTypes';

const ItemDisplay: React.FC<UserGameProps> = (props: UserGameProps): JSX.Element => {
  const [review, setReview] = useState('');
  // const user = useSelector((state: RootState) => state.userReducer);
  const [gameId, setGameId] = useState<string>('');
  const [yearPublished, setYearPublished] = useState<string>('');
  const [minPlayers, setMinPlayers] = useState<string>('');
  const [maxPlayer, setMaxPlayers] = useState<string>('');
  const [minAge, setMinAge] = useState<string>('');
  // const [mechanics, setMechanics] = useState<string>('');
  // const [categories, setCategories] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [playCount, setPlayCount] = useState<string>('');
  const [rating, setRating] = useState<string>('');

  useEffect(() => {
    console.log(props.location.state.userGame);
    setGameId(props.location.state.userGame.game_id);
    setYearPublished(props.location.state.userGame.year_published);
    setMinPlayers(props.location.state.userGame.min_players);
    setMaxPlayers(props.location.state.userGame.max_players);
    // setMechanics(props.location.state.userGame.mechanics);
    // setCategories(props.location.state.userGame.categories);
    setDescription(props.location.state.userGame.description);
    setImageUrl(props.location.state.userGame.image_url);
    setName(props.location.state.userGame.name);
    setPlayCount(props.location.state.userGame.play_count);
    setRating(props.location.state.userGame.rating);
    setMinAge(props.location.state.userGame.min_age);
  }, [review]);

  useEffect((): void => {
    getReview();
  }, [gameId]);

  const postReview = () => {
    console.log(review);
    axios
      .put(`/api/usergame/review`, {
        gameID: gameId,
        review: review
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const reviewCheck = (review: string): void => {
    if (review.length < 1) {
      setReview('');
    } else {
      setReview(review);
    }
  };

  const getReview = (): void => {
    // console.log('getReview hit');
    // console.log(gameId);
    axios
      .get(`/api/player/reviews/${gameId}`)
      .then((res) => {
        const review = res.data;
        console.log(res.data);
        reviewCheck(review);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    postReview();
    getReview();
    setReview('');
  };

  // const mappedReviews = Object.values(review).map((elem: typeof review, index: number) => {
  //   if (review !== null) {
  //     return <p key={index}>{elem.review}</p>;
  //   } else {
  //     return <div key={index}>No Review</div>;
  //   }
  // });

  // const ReviewButton = () => {
  //   if (review.review === '') {
  //     return <button>Update Review</button>;
  //   } else if (review.review == null) {
  //     return <button>Make Review</button>;
  //   }
  // };

  return (
    <div>
      <section>
        <h2>{name}</h2>
        <img src={imageUrl} />
        <p>Year Published:{yearPublished}</p>
        <p>Minimun Player:{minPlayers}</p>
        <p>Maximum Age:{maxPlayer}</p>
        <p>Minimum Age:{minAge}</p>
        {description}
        {/* <p>{mechanics}</p>
        <p>{categories}</p> */}
        <p>Play Count:{playCount}</p>
        <p>Your Rating:{rating}</p>
      </section>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviews-box">Reviews:</label>
        <textarea
          id="review"
          value={review}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => setReview(e.target.value)}
          placeholder="write review here"
          name="review"
        />
        {/* <div>{ReviewButton()}</div>
        <div>{mappedReviews}</div> */}
      </form>
    </div>
  );
};

export default ItemDisplay;
