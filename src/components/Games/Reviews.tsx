import React, {useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

type Reviews = {
  game_id?: string;
  review?: string;
  
}
const Reviews: React.FC<Reviews> = (): JSX.Element => {

const [reviews, setReviews] = useState([])


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
}, [])

const mappedReviews = reviews.map((elem: Reviews, id: number) => {
  return (
    <div key={id}>
    <div >{elem.review}</div>
    <div >{elem.game_id}</div>
    </div>
    )
  })
  
const handleSubmit = (e: FormEvent<HTMLFormElement> ): void => {
      e.preventDefault();
    };
//  const handleChange = (e: FormEvent<HTMLFormElement> ): void => {
//       setReviews({
//           reviews: e.currentTarget.value //Error : property 'value' does not exist on type 'EventTarget'
//       });
//   }

  // const onReviewChange = <P extends keyof Reviews>(prop: P, value: Reviews[P]) => {
  //       setReviews({ ...reviews, [prop]: value });
  //     };
      
// setReviews([]);

  return (
  <div>
    Reviews:
    {mappedReviews}
    <form
    onSubmit={(e) => handleSubmit(e)}
    >
    Enter Review:
    <label>Game ID</label>
      <input
      name="game-id"
      placeholder="game ID!"
      // onChange={(e)=> handleSubmit(e.target.value)}
    
      />
    <label>REVIEW</label>
      <textarea
      name='reviewTxt'
      placeholder="Write a Review!"
      // onChange={(e)=>{onReviewChange('review', e.target.value)}}

      />
      <button>Enter</button>
      </form>
  </div>
  )
}

export default Reviews