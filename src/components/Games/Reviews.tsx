import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Review } from 'customTypes';

const Reviews: React.FC<Review> = (): JSX.Element => {
  const [review, setReview] = useState([]);
  const [userId, setUserId] = useState(0);
  const [gameId, setGameId] = useState('');

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
        <p>{elem.review}</p>
      </div>
    );
  });

  return (
    <div>
      Reviews:
      <form>
        <label>User Id</label>
        <input
          onChange={(e) => {
            setUserId(parseInt(e.currentTarget.value));
          }}
          type="number"
          name="user_id"
          placeholder="User ID"
        />
        <label>Game Id</label>
        <input
          onChange={(e) => {
            e.preventDefault();
            setGameId(e.currentTarget.value);
          }}
          type="string"
          name="game_id"
          placeholder="Game ID"
        />
        <button>Enter</button>
        {mappedReviews}
      </form>
    </div>
  );
};

export default Reviews;
