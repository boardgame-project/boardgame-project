import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="heroContainer">
      <div className="heroPic"></div>
      <div className="heroText">
        <h1>TopTable Games</h1>
        <p>review | rate | track</p>
        {/* <p>your games</p> */}
      </div>
    </div>
  );
};

export default Hero;
