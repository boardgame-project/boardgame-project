import axios from 'axios';
import React, { useState, useEffect, SyntheticEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserGameProps } from 'customTypes';

const ItemDisplay: React.FC<UserGameProps> = (props: UserGameProps): JSX.Element => {
  const [review, setReview] = useState([] as any);
  const user = useSelector((state: RootState) => state.userReducer);
  const [gameId, setGameId] = useState([]);

  useEffect(() => {
    console.log(props.location.state.userGame)
    setGameId(props.location.state.userGame.gameId)
  })

  const postReview = () => {
    axios
      .put(`/api/usergame/review`, {
        userID: user.user_id,
        gameID: gameId,
        review: `${review}`
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getReview = (): void => {
    axios
      .get(`/api/player/reviews/${gameId}` )
      .then((res) => {
        const reviewsArray = res.data;
        console.log(reviewsArray)
        setReview(reviewsArray)
      })
      .catch((err) => console.log(err));
      
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    postReview();
    getReview();
    setReview({
      review:""
    });
  };
  
  const mappedReviews = Object.values(review).map((elem: typeof review, index: number) => {
    if (review !== null) {
      return <p key={index}>{elem.review}</p>
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

  useEffect((): void => {
    getReview();
  }, [setReview]);


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviews-box">Reviews:</label>
        <textarea
        id="review"
        value={review.review}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => 
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
