import axios from 'axios';
import React, {   FormEvent, useState, useEffect } from 'react';

type UserReview = {
  userID?: number;
  gameID?: string;
  review?: string;
}

const ItemDisplay: React.FC<UserReview> = (): JSX.Element => {
const [review, setReview] = useState([] as any)
  
  const postReview = () => {
      axios.put(`/api/usergame/review`, { userID: 7, gameID: '0Z20rVZ9GQ', review: `${review}` })
      .then(res => {
        console.log(res.data)
      }).catch(err => console.log(err))
    }
  const getReview = (): void => {
    axios
      .get(`/api/player/reviews/7`)
      .then((res) => {
        console.log(res.data)
        const reviewsArray = res.data;
        setReview(reviewsArray);
      })
      .catch((err) => console.log(err));
  };
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    postReview();
    // getReview();
  }
  useEffect((): void => {
    getReview();
      console.log('Re-Rendering!')
  },[]);
    const mappedReviews = Object.values(review).map((elem: typeof review, game_id: number) => {
      if (elem.review == "") {
        return (
          <div key={game_id}>
          <div>No Review Here</div>
          <button>Add Review</button>
          </div>
        
        );
      }
      if (elem.review) {
    return (
        <div key={game_id}>
        <p>{elem.review}</p>
        <button>Change Review</button>
        </div>
    );
      }
  });
  return (
  <div
    onSubmit={handleSubmit}>
    <form>
      <label htmlFor="reviews-box">Reviews:</label>
      <textarea
      onChange={(e) =>
      setReview(e.currentTarget.value)}
      wrap="hard"
      name="review"
      placeholder="write review here"/>
      {mappedReviews}
      </form>
      )

};

export default ItemDisplay;
