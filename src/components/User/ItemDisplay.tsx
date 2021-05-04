import axios from 'axios';
import React, {  FormEvent, useState } from 'react';

type UserReview = {
  userID?: number;
  gameID?: string;
  review?: string,
}

const ItemDisplay: React.FC<UserReview> = (): JSX.Element => {
  // const [userID, setUserID] = useState<number>(0);
  // const [gameID, setGameID] = useState<string>('');
  const [review, setReview] = useState('')

  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const postReview = () => {
      axios.put(`/api/usergame/review`, { userID: 7, gameID: '0Z20rVZ9GQ', review: `${review}` })
      .then(res => {
        console.log(res.data)
      }).catch(err => console.log(err))
    }
    postReview();
  }
  // useEffect(() => {
  //   postReview();
  // }, [setReview])


  return (
  <div>
    <form
      onSubmit={handleSubmit}
    >
      <label htmlFor="reviews-box" >Reviews:</label>
      <textarea
      onChange={(e) =>
      setReview(e.target.value)}
      wrap="hard"
      name="review"
      placeholder="write review here"
      />
      <button>Enter</button>
      </form>
  </div>
  )
}

export default ItemDisplay