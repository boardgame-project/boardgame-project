// import React, {useState, useEffect} from 'react';
import React from 'react';
import ItemDisplay from './ItemDisplay';
import MyAccount from './MyAccount';
import ShelfItem from './ShelfItem';


const User: React.FC = () => {

  return (
  
  <div>
    <ShelfItem />
    <ItemDisplay />
    <MyAccount />
  </div>
  )
}

export default User