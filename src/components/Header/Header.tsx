import axios from 'axios';
import React from 'react';

const Header: React.FC = () => {

  function getUser(() => {
    axios.get('/api/auth/user')
  })

  return (<></>)
}

export default Header