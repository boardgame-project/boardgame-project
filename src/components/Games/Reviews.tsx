import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Review, ReviewProps } from 'customTypes';

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
      <article key={id}>
        <h4>{elem.username}</h4>
        <div>{elem.rating}</div>
        <div>{elem.review}</div>
      </article>
    );
  });

  return (
    <div>
      {mappedReviews.length ? <h2>Reviews:</h2> : ''}
      {mappedReviews}
    </div>
  );
};

export default Reviews;
