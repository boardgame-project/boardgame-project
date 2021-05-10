import axios from 'axios';
import React, { useState, useEffect, SyntheticEvent, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { UserGameProps } from 'customTypes';

const ItemDisplay: React.FC<UserGameProps> = (props: UserGameProps): JSX.Element => {
  const [review, setReview] = useState([] as any);
  const [isReview, setIsReview] = useState<boolean>(true);

  const user = useSelector((state: RootState) => state.userReducer);

  // const toggleButton = (): void => {
  //   setIsReview(!isReview);
  // };
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
      .get(`/api/player/reviews/${user.user_id}`)
      .then((res) => {
        console.log(res.data);
        const reviewsArray = res.data;
        const reviewsArrayNew = JSON.stringify(reviewsArray)
        const valuesArray = JSON.parse(reviewsArrayNew)
        console.log(valuesArray)
        setReview(valuesArray);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsReview(!isReview);
    postReview();
    getReview();
    // setReview("");
  };
  
  const mappedReviews = Object.values(review).map((elem: typeof review, index: number) => {
    if (review !== "") {
      return (
          <p key={index}>{elem.review}</p>
      );
    } else {
      return <div key={index}>No Review</div>;
    }
  });
  useEffect((): void => {
    // console.log(review);
    getReview();
    // return setReview("")
  }, [setReview]);

  const ReviewButton = () => {
    if (review === '') {
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
