import React from 'react';
import './scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header';
import Hero from './components/Header/Hero';
import routes from './routes';

import './reset.css';
const App: React.FC = () =>  {

  return (
    <div className="App">
      <Header />
      <Hero />
      {routes}
    </div>
  );
}

export default App;
 