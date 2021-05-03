import React, {useState, useEffect} from 'react';
import axios from 'axios';
const {CLIENT_ID} = process.env;

type apiGame = {
  year_published: number, 
  min_players: number,
  max_players: number,
  min_age: number,
  mechanics: string,
  categories: string,
  description: string,
  image_url: string, 
}

type Review = {
  game_id: string,
  review: string
  firstName: string
}

type thumbGame = {
  game_id: string,
  name: string, 
  thumb_url: string
} 

const GameDisplay: React.FC<thumbGame> = (props: thumbGame):JSX.Element => {

const [reviews, setReviews] = useState([])
const [yearPublished, setYearPublisehd] = useState("");
const [minPlayers, setMinPlayers] = useState("");
const [maxPlayers, setMaxPlayers] = useState("");
const [minAge, setMinAge] = useState("");
const [mechanics, setMechanics] = useState("");
const [categories, setCategories] = useState("");
const [description, setDescription] = useState("");
const [imageUrl, setImageUrl] = useState("");


useEffect(():void => {
  getGameReviews()
  getGameDetails()
})

  const getGameReviews = ():void => {
    axios.get(`/api/game/review/:${props.game_id}`)
    .then(res => {
      const reviewsArray = res.data
      console.log(res.data)
      setReviews(reviewsArray)
    }).catch(err => console.log(err))
  }

  const getGameDetails = async ():Promise<void>=> {
    await axios.get(`https://api.boardgameatlas.com/api/search?ids=${props.game_id}&fields=year_published,min_players,max_players,min_age,mechanics,categories,description,image_url&client_id=${CLIENT_ID}`)
    .then(res=> {
     setYearPublisehd( res.data.games[0].year_published)
     setMinPlayers( res.data.games[0].min_players)
     setMaxPlayers( res.data.games[0].max_players)
     setMinAge( res.data.games[0].min_age)
     setMechanics( res.data.games[0].description)
     setCategories( res.data.games[0].image_url)
     setDescription( res.data.games[0].mechanics)
     setImageUrl( res.data.games[0].categories)
    axios.get(`https://api.boardgameatlas.com/api/game/mechanics?client_id=${CLIENT_ID}`)

    })
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
      <p className="game-info">{description}</p>
      {/* <div className="game-rating"></div> */}
    </div>
    {/* <div className="game-reviews">{props.reviews}</div> */}
    <img src={image_url} className="game-images" alt={props.name}/>
    <p>{year_published}</p>
    <p>{categories}</p>
    <p>{mechanics}</p>
    <p>{min_players}</p>
    <p>{max_players}</p>
    <p>{min_age}</p>
    {mappedReviews}
  </div>
  
  )
}

export default GameDisplay