import React, {useEffect} from 'react';
import axios from 'axios';
import './scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import routes from './routes';
import './reset.css';

const App: React.FC = () =>  {

  // const [gameMechanics, setGameMechanics] = useState<[]>([]);
  // const [gameCatagories, setGameCatagories] = useState<[]>([]);

  useEffect(():void => {
    getGameMechanics()
    getGameCatagories()
  }, [])

  const getGameMechanics = ():void => {
    axios.get('/api/game/mechanic')
    .then(res => {
      console.log(res.data)
      // setGameMechanics(res.data)
    })
    .catch(err => console.log(err))
  };

  const getGameCatagories = ():void => {
    axios.get('/api/game/catagory')
    .then(res => {
      console.log(res.data)
      // setGameCatagories(res.data)
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="App">
      <Header />
      {routes}
    </div>
  );
}

export default App;
