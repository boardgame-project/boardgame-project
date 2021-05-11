import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import {Player} from 'customTypes';

import Gold from '../../Images/TTGMedalGold.png';
import Silver from '../../Images/TTGMedalSilver.png';
import Bronze from '../../Images/TTGMedalBronze.png';
import Black from '../../Images/TTGMedalBlack.png';

const LeaderBoard: React.FC = (): JSX.Element => {
  const [leaders, setLeaders] = useState([]);
  // const [first, setFirst] = useState<Player>();
  // const [second, setSecond] = useState<Player>();
  // const [third, setThird] = useState<Player>();
  // const [fourth, setFourth] = useState<Player>();
  // const [fifth, setFifth] = useState<Player>();

  useEffect((): void => {
    getLeaderboard();
  }, []);

  console.log(leaders);

  // const first = leaders[0].username;
  // const second = leaders[1].username;
  // const third = leaders[2].username;
  // const fourth = leaders[3].username;
  // const fifth = leaders[4].username;

  const getLeaderboard = async (): Promise<void> => {
    await axios
      .get('/api/player/leaderboard')
      .then((res) => {
        const leaderboardArray = res.data;
        console.log(res.data);
        setLeaders(leaderboardArray);
        // setFirst(leaderboardArray[0])
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className="leaderboard">
      <div className="boardTable">
        <h4>Leaderboard</h4>
      </div>
      <div className="columns">
        <h5>user</h5>
        <h5>total</h5>
      </div>
      <div className="users">
        <div className="leaderRow">
          <div className="position">
            <img src={Gold} />
            <p>Player One</p>
          </div>
          <p>234</p>
        </div>
        <div className="leaderRow">
          <div className="position">
            <img src={Silver} />
            <p>Player Two</p>
          </div>
          <p>212</p>
        </div>
        <div className="leaderRow">
          <div className="position">
            <img src={Bronze} />
            <p>Player Three</p>
          </div>
          <p>198</p>
        </div>
        <div className="leaderRow">
          <div className="position">
            <img src={Black}/>
            <p>Player Four</p>
          </div>
          <p>157</p>
        </div>
        <div className="leaderRow">
          <div className="position">
            <img src={Black}/>
            <p>Player Five</p>
          </div>
          <p>132</p>
        </div>
      </div>
      <div className="boardScoreWrapper">
        <p className="userDataP"></p>
      </div>
    </section>
  );
};
export default LeaderBoard;
