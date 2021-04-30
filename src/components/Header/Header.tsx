import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';


// interface StateUser {
//   user_id: number,
//   first_name: string, 
//   last_name: string,
//   email: string
// }

const Header: React.FC = () => {

  const user_id = useSelector((state: RootState) => state.userReducer.user_id) 

  const dispatch = useDispatch();

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

  const logoutUser = ():void => {
    axios.delete('/api/auth/logout')
      .then(() => {
        dispatch({type: 'LOGOUT_USER'})
      })
      .catch(err => console.log(err))
  }

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
          {user_id ? <li><a onClick={logoutUser}>logout</a></li> : <li><Link className='navLink' to='/auth'>login</Link></li>}
          
        </ul>
      </div>
    </nav>   
  </div>
  )
}

export default (Header);