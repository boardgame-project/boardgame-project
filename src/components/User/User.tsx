// import React, {useState, useEffect} from 'react';
import React from 'react';
import ShelfItem from './ShelfItem';
import ItemDisplay from './ItemDisplay';
import MyAccount from './MyAccount';


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