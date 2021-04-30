import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
// import {useDispatch} from 'react-redux';

const Header: React.FC = () => {

  // interface User {
  //   user_id: number,
  //   first_name: string, 
  //   last_name: string,
  //   email: string
  // }

  // const dispatch = useDispatch();

  // POTENTIALLY MOVE--due to when the component mounts(was in for initail front to back check)
  // const getUser = ():void => {
  //   axios.get<User>('/api/auth/user') 
  //   .then(res => {
  //     const user = res.data
  //     console.log(res.data)
  //     dispatch({type: 'UPDATE_USER', action: user})
  //   })  
  //   .catch(err => console.log(err))
  // };

  // const logoutUser = ():void => {
  //   axios.delete('/api/auth/logout')
  //     .then(() => {
  //       dispatch({type: 'LOGOUT_USER'})
  //     })
  //     .catch(err => console.log(err))
  // }

  return (
  <div className='header'>



    <div>
      <div className='hexContainer'>
        <div className="hexagon1"></div>
        <div className="hexagon2"></div>
        <div className="hexagon3"></div>
      </div>
    </div>

    <nav id='navContainer'>
      <div id="menuToggle">
    
        <input type="checkbox" />
    
        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          <li><Link className='navLink' to='/'>home</Link></li>
          <li><Link className='navLink' to='/'>profile</Link></li>
          <li><Link className='navLink' to='/'>account</Link></li>
          <li><Link className='navLink' to='/'>games</Link></li>
          <li><Link className='navLink' to='/'>login/logout</Link></li>
        </ul>
      </div>
    </nav>   

    {/* <button onClick={logoutUser}>logout</button>
    <Link className="game-library-link" to="/">Landing Page</Link>
    <Link className="login-link" to="/auth">Login</Link>
    <Link className="my-account-link" to="/account">My Account</Link>
    <Link className="item-display-link" to="/item">Items</Link>
    <Link  className="game-display-link" to="/game">Games</Link> */}
  </div>
  )
}

export default Header