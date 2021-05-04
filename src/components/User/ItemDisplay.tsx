// import React, {useState, useEffect} from 'react';
import axios from 'axios';
import React, { FormEvent, useEffect } from 'react';

type UserReview = {
  userId?: number;
  gameID?: string;
  review?: string,
}

const ItemDisplay: React.FC<UserReview> = (): JSX.Element => {
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }
  useEffect((): void => {
    const postReview = (): void => {
      axios.put(`/api/usergame/review`)
      .then(res => {
        console.log(res.data)
      }).catch(err => console.log(err))
    }
    postReview();
  }, [handleSubmit])


  return (
  <div>
    <form
    onSubmit={handleSubmit}
    >
      <label htmlFor="reviews-box" >Reviews:</label>
      <textarea
      wrap="hard"
      // id={id}
      name="review"
      placeholder="write review here"
      />
      <button
      type="button"
      >Enter</button>
      </form>
  </div>
  )
}

export default ItemDisplay