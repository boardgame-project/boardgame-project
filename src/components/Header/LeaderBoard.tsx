import React from 'react';

type LeaderProps = {
  user: string;
  score: number;
}

const LeaderBoard: React.FC<LeaderProps> = (LeaderProps) => {
  const { user, score } = LeaderProps

  return (
  <div>
    {user}
    {score}
  </div>
  )
}

export default LeaderBoard