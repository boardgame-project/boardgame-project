import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Review, ReviewProps } from 'customTypes';
import Rating from '../StyledComponents/Rating';

const Reviews: React.FC<ReviewProps> = (props: ReviewProps) => {
  const [review, setReview] = useState([]);
  const game_id = props.game_id;

  const getGameReview = (): void => {
    axios
      .get(`/api/game/reviews/${game_id}`)
      .then((res) => {
        const reviewsArray = res.data;
        setReview(reviewsArray);
      })
      .catch((err) => console.log(err));
  };

  useEffect((): void => {
    getGameReview();
  }, []);

  const mappedReviews = review.map((elem: Review, id: number) => {
    return (
      <article className="reviewContainer" key={id}>
        <h5>{elem.username}</h5>
        <Rating rating={elem.rating} />
        <br />
        <div>{elem.review}</div>
      </article>
    );
  });

  return (
    <div>
      {mappedReviews.length ? <h4>Reviews:</h4> : ''}
      {mappedReviews}
    </div>
  );
};

export default Reviews;
