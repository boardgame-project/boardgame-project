import axios from 'axios';
import React, {  useState, useEffect, SyntheticEvent } from 'react';

type UserReview = {
  userID?: number;
  gameID?: string;
  review?: string;
}

const ItemDisplay: React.FC<UserReview> = (): JSX.Element => {
const [review, setReview] = useState([] as any)
const [isReview, setIsReview] = useState<boolean>(true);

const toggleButton = (): void => {
  setIsReview(!isReview)
}
  
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
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    postReview();
    }
  
  useEffect((): void => {
    getReview();
      console.log('Re-Rendering!')
  },[isReview]);

    const mappedReviews = Object.values(review).map((elem: typeof review, game_id: number) => {
      if (elem.review !== null) {
    return (
        <div key={game_id}>
        <p>{elem.review}</p>
        </div>
    );
      } else {
        return <div>No Review</div>
      }
  });
  return (
  <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="reviews-box">Reviews:</label>
      <textarea
      onChange={(e) => setReview(e.target.value)}
      placeholder="write review here"
      name="review"
      />
      {review.review? (
     <button disabled={!review} onClick={toggleButton}>Change Review</button>) :
     (<button disabled={!review} onClick={toggleButton}>Add Review</button>)
      }
      <div>{mappedReviews}</div>
      </form>
      </div>
      )

};

export default ItemDisplay;
