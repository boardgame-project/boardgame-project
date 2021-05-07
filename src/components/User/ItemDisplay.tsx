import axios from 'axios';
import React, { useState, useEffect, SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserGameProps } from 'customTypes';

const ItemDisplay: React.FC<UserGameProps> = (props: UserGameProps): JSX.Element => {
  const [review, setReview] = useState([] as any);
  const [isReview, setIsReview] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.userReducer);

  const toggleButton = (): void => {
    setIsReview(!isReview);
  };

  const postReview = () => {
    axios
      .put(`/api/usergame/review`, {
        userID: user.user_id,
        gameID: props.location.state.userGame.game_id,
        review: `${review}`
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const getReview = (): void => {
    axios
      .get(`/api/player/reviews/7`)
      .then((res) => {
        console.log(res.data);
        const reviewsArray = res.data;
        setReview(reviewsArray);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    postReview();
  };

  useEffect((): void => {
    getReview();
    console.log('Re-Rendering!');
  }, [isReview]);

  const mappedReviews = Object.values(review).map((elem: typeof review, game_id: number) => {
    if (elem.review !== null) {
      return (
        <div key={game_id}>
          <p>{elem.review}</p>
        </div>
      );
    } else {
      return <div>No Review</div>;
    }
  });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviews-box">Reviews:</label>
        <textarea onChange={(e) => setReview(e.target.value)} placeholder="write review here" name="review" />
        {review.review ? (
          <button disabled={!review} onClick={toggleButton}>
            Change Review
          </button>
        ) : (
          <button disabled={!review} onClick={toggleButton}>
            Add Review
          </button>
        )}
        <div>{mappedReviews}</div>
      </form>
    </div>
  );
};

export default ItemDisplay;
