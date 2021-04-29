// import React, {useState, useEffect} from 'react';
import React from 'react';

type UserReview = {
  review?: string,
}

const ItemDisplay: React.FC<UserReview> = (UserReview) => {
const { review } = UserReview
  return (
  <div>
    {review}
  </div>
  )
}

export default ItemDisplay