import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Player } from 'customTypes';

const LeaderBoard: React.FC<Player> = (): JSX.Element => {
  const getLeaderboard = (): void => {
    axios
      .get('/api/player/leaderboard')
      .then((res) => {
        const leaderboardArray = res.data;
        setRow(leaderboardArray);
      })
      .catch((err) => console.log(err));
  };

  const [row, setRow] = useState([]);
  useEffect((): void => {
    getLeaderboard();
  }, []);

  const mappedLeaderboard = row.map((elem: Player, id: number) => {
    return (
      <div className="leaderboard" key={id}>
        <div className="boardTable">
          <div className="userData">
            {/* <div className="boardPositionWrapper">
          <p className="userDataP">{id}</p>
        </div> */}
            <div className="boardUsernameWrapper">
              <p className="userDataP">{elem.username}</p>
            </div>
            <div className="boardScoreWrapper">
              <p className="userDataP">{elem.total}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <div>{mappedLeaderboard}</div>;
};
export default LeaderBoard;
