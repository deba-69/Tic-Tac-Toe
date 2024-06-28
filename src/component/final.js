import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './style1.css'; // Assuming you have a CSS file for styling
import humansImg from './humans.png';
import compImg from './comp.png';
import homepage from './homepage.png';
import { useState } from 'react';
import Rule1 from './rule1.png';
import Rule2 from './rule2.png';
import Rule3 from './rule3.png';
import Rule4 from './rule4.png';

const MainPage = () => {

  const [count,setCount] = useState(0);

  const Rules = [
    {
      rule : "The game is played on a 3x3 grid.",
      image : Rule1
    },
    {
      rule : "Two players take turns placing their symbol (X or O) on an empty square.",
      image : Rule3
    },
    {
      rule : "The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins the game.",
      image : Rule2
    },
    {
      rule : "If all squares are filled and no player has won, the game is a draw.",
      image : Rule4
    }
  ];

  const prev = () => {
    if(count !== 0)
    {
      setCount(count - 1);
    }
  }

  const nxt = () => {
    if(count !== 3)
    {
      setCount(count + 1);
    }
  }

  
  return (
    // <Router>
    <>
      <div className="main-container">
        <div className="background-image"> {homepage}
        <div className="cards-container">
          <Link to="/vsHuman" className="card">
            <img src={humansImg} alt="Humans vs Humans" />
          </Link>

          <Link to="/vsComp" className="card">
            <img src={compImg} alt="Humans vs Computer" />
          </Link>
        </div>
        <div className='rules-container'>
          <h2>Rules</h2>
          <div className='disp-rules'>
            <span>{Rules[count].rule}</span>
            <img src={Rules[count].image} alt='not found'></img>
          </div>
          <div className='btns'>
            <button onClick={prev}>Previous</button>
            <button onClick={nxt}>Next</button>

          </div>
          {/* <div>
          <img src='' alt='not found'></img>
            <span>Two players take turns placing their symbol (X or O) on an empty square.</span>
          </div>
          <div>
            <span>The first player to get three of their symbols in a row (horizontally, vertically, or diagonally) wins the game.</span>
            <img src='' alt='not found'></img>
          </div> */}
          {/* <div>
            <img src='' alt='not found'></img>
            <span>If all squares are filled and no player has won, the game is a draw.</span>
          </div> */}

        </div>
        </div>
      </div>
    </> 
    // </Router>
  );
};

export default MainPage;
