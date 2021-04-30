import React from 'react';
import './scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Hero from './components/Header/Hero';
import routes from './routes';

import './reset.css';
import LeaderBoard from './components/Header/LeaderBoard';
const App: React.FC = () =>  {

  return (
    <div className="App">
      <Header />
      <Hero />
      <LeaderBoard />
      {routes}
    </div>
  );
}

export default App;
 