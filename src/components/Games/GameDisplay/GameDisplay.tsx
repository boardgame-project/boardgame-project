import React, {useState, useEffect} from 'react';
import axios from 'axios';

type Game = {
  game_id: string,
  name: string, 
  year_published: string, 
  min_players: number,
  max_players: number,
  min_age: number,
  mechanics: string,
  categoties: string,
  description: string,
  image_url: string, 
  thumb_url: string
}

type Review = {
  game_id: string,
  review: string
  firstName: string
}

const GameDisplay: React.FC<Game> = (props: Game):JSX.Element => {

  const [reviews, setReviews] = useState([])

useEffect(():void => {
  getGameReviews()
})

  const getGameReviews = ():void => {
    axios.get(`/api/game/review/:${props.game_id}`)
    .then(res => {
      const reviewsArray = res.data
      console.log(res.data)
      setReviews(reviewsArray)
    }).catch(err => console.log(err))
  }

  const mappedReviews = reviews.map((elem: Review, id: number) => {
    return <div key={id}>
      <p>{elem.firstName}</p>
      <p>{elem.review}</p>
    </div>
  })

  return (
  <div className="game-display-page">
    <div className="game-info-container">
      <h1 className="game-name">{props.name}</h1>
      <p className="game-info">{props.description}</p>
      {/* <div className="game-rating"></div> */}
    </div>
    {/* <div className="game-reviews">{props.reviews}</div> */}
    <img src={props.image_url} className="game-images" alt={props.name}/>
    <p>{props.year_published}</p>
    <p>{props.categoties}</p>
    <p>{props.mechanics}</p>
    <p>{props.min_players}</p>
    <p>{props.max_players}</p>
    <p>{props.min_age}</p>
    {mappedReviews}
  </div>
  
  )
}

export default GameDisplay