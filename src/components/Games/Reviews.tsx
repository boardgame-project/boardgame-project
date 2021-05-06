import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Review } from 'customTypes';

const Reviews: React.FC<> = (props): JSX.Element => {
  const [review, setReview] = useState([]);

  const getReview = (): void => {
    axios
      .get(`/api/player/reviews/${userId}`)
      .then((res) => {
        const reviewsArray = res.data;
        setReview(reviewsArray);
      })
      .catch((err) => console.log(err));
  };
  const getGameReview = (): void => {
    axios
      .get(`/api/game/reviews/${gameId}`)
      .then((res) => {
        const reviewsArray = res.data;
        setReview(reviewsArray);
      })
      .catch((err) => console.log(err));
  };

  useEffect((): void => {
    getReview();
  }, [userId]);
  useEffect((): void => {
    getGameReview();
  }, [gameId]);

  const mappedReviews = review.map((elem: Review, id: number) => {
    return (
      <div key={id}>
        <>
        <p>{elem.review}</p>
      </div>
    );
  });

  return (
    <div>
      Reviews:
      <form>
        {mappedReviews}
      </form>
    </div>
  );
};

export default Reviews;
