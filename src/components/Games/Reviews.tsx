import React, {useEffect, useState} from 'react';
import axios from 'axios';

type Reviews = {
  user_id?: number;
  game_id?: string;
  review?: Array<string> | null;
}

const Reviews: React.FC<Reviews> = (): JSX.Element => {

const [review, setReview] = useState([])
const [userId, setUserId] = useState(0)
const [gameId, setGameId] = useState("")


useEffect(():void => {
  const getReview = ():void => {
    axios.get(`/api/player/reviews/${userId}`)
    .then(res => {
      console.log(res.data)
      const reviewsArray = res.data
      setReview(reviewsArray)
    }).catch(err => console.log(err))
  }
  getReview();
}, [userId])

useEffect(():void => {
  const getGameReview = ():void => {
    axios.get(`/api/game/reviews/${gameId}`)
    .then(res => {
      console.log(res.data)
      const reviewsArray = res.data
      setReview(reviewsArray)
    }).catch(err => console.log(err))
  }
  getGameReview();
}, [gameId])

  const mappedReviews = review.map((elem: Reviews, id: number) => {
    return <div key={id}>
      <p>{elem.review}</p>
    </div>
  })

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
    {mappedReviews}
      </form>
  </div>
  )
  }

export default Reviews