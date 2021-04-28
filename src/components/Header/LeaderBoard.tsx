import React from 'react';

type Players = {
  user: string;
  score: number;
}

const LeaderBoard: React.FC<Players> = (Players) => {
  const { user, score } = Players

  return (
  <div>
    {user}
    {score}
  </div>
  )
}

export default LeaderBoard