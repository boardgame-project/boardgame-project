import React, {useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

type Reviews = {
  game_id?: string;
  review?: string | null;
}

const defaultReviews: Reviews = {
  game_id:"",
  review:"",
}
const Reviews: React.FC<Reviews> = (): JSX.Element => {

const [reviews, setReviews] = useState(defaultReviews)
const [gameid, setGameId] = useState(defaultReviews)


const getReviews = ():void => {
  axios.get(`/api/game/reviews/0Z20rVZ9GQ`)
  .then(res => {
    console.log(res.data)
    const reviewsArray = res.data
    setReviews(reviewsArray)
  }).catch(err => console.log(err))
}

useEffect(():void => {
  console.log('component mounted')
  getReviews();
}, [setGameId])


// const mappedReviews = Object.values(reviews).map(reviews => {
//   return (
//     <div key={reviews}>
//     <div >{reviews}</div>
//     </div>
//     )
//   })
  
const handleSubmit = (e: FormEvent<HTMLFormElement> ): void => {
      e.preventDefault();
};
const onReviewChange = <P extends keyof Reviews>(prop: P, value: Reviews[P]) => 
{
      setReviews({...reviews, [prop]: value});
      };
const onGameIdChange = <T extends keyof Reviews>(prop: T, value: Reviews[T]) => 
  {
    setGameId({...gameid, [prop]: value});
};

  

  return (
  <div>
    Reviews:
    {/* {mappedReviews} */}
    <form
    onSubmit={(e) => handleSubmit(e)}
    >
    <h1>Enter Review:</h1>
    <label>Game ID</label>
    <input
    onChange={e=>{onGameIdChange('game_id', e.target.value)}}
    value={reviews.game_id}
    name="game_id"
    />
      <textarea
      value={reviews.review || ""}
      name='review'
      placeholder="Write a Review!"
      onChange={(e)=>{onReviewChange('review', e.target.value)}}
      />
      <button>Enter</button>
      </form>
  </div>
  )
}

export default Reviews