import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';

const Header: React.FC = () => {

  interface User {
    user_id: number,
    first_name: string, 
    last_name: string,
    email: string
  }

  const dispatch = useDispatch();

  const getUser = ():void => {
    axios.get<User>('/api/auth/user') 
    .then(res => {
      const user = res.data
      console.log(res.data)
      dispatch({type: 'UPDATE_USER', action: user})
    })  
  };


  return (
  <div>
    <button onClick={getUser}>getUser</button>
    <Link className="game-library-link" to="/">Landing Page</Link>
    <Link className="login-link" to="/auth">Login</Link>
    <Link className="my-account-link" to="/account">My Account</Link>
    <Link className="item-display-link" to="/item">Items</Link>
    <Link  className="game-display-link" to="/game">Games</Link>
  </div>
  )
}

export default Header