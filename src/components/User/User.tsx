import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ShelfItem from './ShelfItem';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { GameState } from '../../redux/userGameReducer';

const User: React.FC = () => {
    // const [userGames, setUserGames] = useState([]);

    const username = useSelector((state: RootState) => state.userReducer.username);
    const [playCount, setPlayCount] = useState(0);

    const userGames = useSelector ((state: RootState) => state.userGameReducer)
    console.log(userGames)

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

    const mappedUserGames = userGames.map((elem: GameState, id: number) => {
        return (
            <div key={id}>
                <ShelfItem {...elem}></ShelfItem>
            </div>
        );
    });

    return (
        <div>
            <section className="userProfile">
                <p>{username}</p>
                <p>playcount: {playCount}</p>
                {/* <div>graph of top 5 plays</div> */}
            </section>
            <div className="shelf">{mappedUserGames}</div>
        </div>
    );
};

export default User;
