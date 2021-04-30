import React from 'react';


type Players = {
  username: string;
  total_plays: number;
};
const LeaderBoard: React.FC<Players> = (Players) => {
  const { username, total_plays } = Players;
  return (
    <div className="leaderboard">
      <div className="boardTable">
        {/* {boardData[scoreTimeFilter].map((d, id) => {
          return ( */}
        <div className="userData">
          <div className="boardPositionWrapper">
            <p className="userDataP">Place</p>
          </div>
          <div className="boardUsernameWrapper">
            <p className="userDataP">Username {username}</p>
          </div>
          <div className="boardScoreWrapper">
            <p className="userDataP">Plays {total_plays}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LeaderBoard