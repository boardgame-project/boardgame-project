import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import routes from './routes';
import Footer from './components/Header/footer';
import { User } from 'customTypes';
import { getUserGames } from './redux/userGameReducer';
import dotenv from 'dotenv';
dotenv.config();

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect((): void => {
    console.log(document.cookie);
    getMechanics();
    getCatagories();
    getUser();
  }, []);

  const getUser = (): void => {
    axios
      .get<User>('/api/auth/user')
      .then((res) => {
        const user = res.data;
        dispatch(getUserGames());
        dispatch({ type: 'UPDATE_USER', payload: user });
      })
      .catch((err) => console.log(err));
  };

  const getMechanics = (): void => {
    axios
      .get(`https://api.boardgameatlas.com/api/game/mechanics?client_id=${process.env.REACT_APP_CLIENT_ID}`)
      .then((res) => {
        const mechanicArr = res.data.mechanics;
        dispatch({ type: 'UPDATE_MEC', payload: mechanicArr });
      })
      .catch((err) => console.log(err));
  };

  const getCatagories = (): void => {
    axios
      .get(`https://api.boardgameatlas.com/api/game/categories?client_id=${process.env.REACT_APP_CLIENT_ID}`)
      .then((res) => {
        const categoryArr = res.data.categories;
        dispatch({ type: 'UPDATE_CAT', payload: categoryArr });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <Header />
      {routes}
      <Footer />
    </div>
  );
};

export default App;
