import React from 'react';
import './Home.css';

function Home(props) {
  return (
    <div>
      <title>Home</title>
      <h2 className="welcome"> Welcome to Filmster </h2>
      <p className="home-msg">Find what movies are currently being played in theaters and what movies will be coming out soon!</p>
    </div>
  );
}

export default Home;