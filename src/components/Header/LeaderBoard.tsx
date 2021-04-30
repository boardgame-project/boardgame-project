import React, { useState, useEffect } from 'react';
import axios from 'axios';


type Players = {
  user_id?: number;
  total?: number;
};
const LeaderBoard: React.FC<Players> = (): JSX.Element => {
  // const { username, total } = Players;

  
  const getLeaderboard = ():void => {
    axios.get('/api/player/leaderboard')
    .then(res => {
      const leaderboardArray = res.data
      console.log(res.data)
      setRow(leaderboardArray)
    }).catch(err => console.log(err))
  }

  const [row, setRow] = useState([])
  useEffect(():void => {
    getLeaderboard()
  }, [])
  
const mappedLeaderboard = row.map((elem: Players, id: number) => {
  return (
    <div className="leaderboard" key={id}>
    <div className="boardTable">
      <div className="userData">
        <div className="boardPositionWrapper">
          <p className="userDataP"></p>
        </div>
        <div className="boardUsernameWrapper">
          <p className="userDataP">{elem.user_id}</p>
        </div>
        <div className="boardScoreWrapper">
          <p className="userDataP">{elem.total}</p>
        </div>
      </div>
    </div>
  </div> 
  )

})
  return (
    <div>
      {mappedLeaderboard}
    </div>
  );
}
export default LeaderBoard