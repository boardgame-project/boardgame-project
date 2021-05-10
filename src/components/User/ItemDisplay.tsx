import axios from 'axios';
import React, { useState, useEffect, SyntheticEvent } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../redux/store';
import { UserGameProps } from 'customTypes';

const ItemDisplay: React.FC<UserGameProps> = (props: UserGameProps): JSX.Element => {
  const [review, setReview] = useState<string>('');
  // const user = useSelector((state: RootState) => state.userReducer);
  const [gameId, setGameId] = useState<string>();

  
  useEffect(() => {
    console.log(props.location.state.userGame)
    setGameId(props.location.state.userGame.game_id)
  }, [])
  
  useEffect((): void => {
    getReview();
  }, [gameId]);

  const postReview = () => {
    console.log(review)
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

  const getReview = (): void => {
    console.log('getReview hit')
    console.log(gameId)
    axios
      .get(`/api/player/reviews/${gameId}`)
      .then((res) => {
        const reviews = res.data;
        console.log(res.data)
        setReview(reviews)
      })
      .catch((err) => console.log(err));
      
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    postReview();
    getReview();
    setReview(review);
  };
  
  const mappedReviews = Object.values(review).map((elem: typeof review, index: number) => {
    if (review !== null) {
      return <p key={index}>{elem}</p>
    } else {
      return <div key={index}>No Review</div>;
    }
  });

  const ReviewButton = () => {
    if (review == null) {
      return <button>Update Review</button>
    } else {
      return <button>Make Review</button>
    }
   };

  


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviews-box">Reviews:</label>
        <textarea
        id="review"
        value={review}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => 
          setReview(e.target.value)} 
        placeholder="write review here" 
        name="review" />
        <div>{ReviewButton()}</div>
        <div>{mappedReviews}</div>
      </form>
    </div>
  );
};

export default ItemDisplay;
