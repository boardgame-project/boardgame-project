import React from 'react';
import axios from 'axios';

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


  return (<div>
    <button onClick={getUser}>getUser</button>
  </div>)
}

export default Header