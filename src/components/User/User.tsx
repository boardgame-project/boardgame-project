import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ShelfItem from './ShelfItem';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { UserGame } from '../../redux/userGameReducer';

const User: React.FC = () => {
  // const [userGames, setUserGames] = useState([]);

  const user = useSelector((state: RootState) => state.userReducer);
  const [playCount, setPlayCount] = useState(0);

  const userGames = useSelector((state: RootState) => state.userGameReducer.userGames);
  console.log(userGames);

  useEffect((): void => {
    // getUserGames();
    getPlayerStats();
  }, []);

  // const getUserGames = () => {
  //     axios
  //         .get('/api/usergame')
  //         .then((res) => {
  //             setUserGames(res.data);
  //             console.log(userGames)
  //         })
  //         .catch((err) => console.log(err));
  // };

  const getPlayerStats = () => {
    axios.get('/api/player/playcount/:id').then((res) => {
      setPlayCount(res.data.sum);
    });
  };

  const mappedUserGames = userGames.map((elem: UserGame, id: number) => {
    return (
      <div key={id}>
        <ShelfItem {...elem}></ShelfItem>
      </div>
    );
  });

  return (
    <div className="flexProfile">
      <aside className="sticky">
        <section className="userProfile">
          <div className="userFlex">
            <h2>{user.username}</h2>
            <h4>playcount: {playCount}</h4>
          </div>
          {/* <div>graph of top 5 plays</div> */}
          <img src="https://via.placeholder.com/150" />
        </section>
      </aside>
      <div className="shelf">{mappedUserGames}</div>
    </div>
  );
};

export default User;
