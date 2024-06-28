import React from 'react';
import './style.css'; // Import your CSS file
import gamingImage from './gaming.jpg';
import tic from "./tic.jpg"
import { BrowserRouter as Router, Link } from 'react-router-dom'; // Import BrowserRouter and Link from react-router-dom

function GamingWebsite() {
    const bodyStyle = {
        fontFamily: 'Arial, Helvetica, sans-serif',
        background: `rgba(0, 0, 0, 0.3) url(${gamingImage})`,
        backgroundBlendMode: 'darken',
        backgroundSize: 'cover'
    };
    const startGame=()=>{

    };
    return (
        // <Router> {/* Ensure that your component is wrapped with BrowserRouter */}
        <>
            <div className = "main">
                <nav className='navbar'>
                    <h2><span>GAMES <br /> </span>ARENA</h2>
                    <ul>
                        <li className='nav-items'>
                            <Link to='/' className='nav-links'>
                                Home
                            </Link>
                        </li>
                        <li className='nav-items1'>
                            <Link to='/' className='nav-links'>
                                Rules
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div id="home" className="content">
                    <div className='home1'>
                    <h1>Welcome to Games Arena</h1>
                    <p>TRY WINNING YOUR TIC-TAC-TOE !!</p>

                    <div className="play">
                        <button  className='button'>
                            <Link to='/' className='button-link'>vs Player</Link>
                        </button>
                        <button  className='button'>
                            <Link to='/vsComp' className='button-link'>vs Comp</Link>
                        </button>
                    </div>

                    </div>
                    <div className='home2'>
                        <div className="card">
                            <img src={tic} alt="game" />
                        </div>
                    </div>
                </div>

                

                

               
                <div id="rules" className="content1">
                    <h2>Rules</h2>
                    <p>Here are the rules of the game:</p>
                    <ul>
                        <li>1.Play occurs on a 3 by 3 grid of 9 squares.</li>
                        <li>2.Two players takes turn making empty squares, the first marking X's, the second O's.</li>
                        <li>3.A row is any three squares on the grid,adjacent diagonally,vertically,or horizontally.</li>
                        <li>4.If one player places three of the same marks in a row, the player wins.</li>
                        <li>5.If the spaces are all filled and there is no winner, the game end in a draw.</li>
                    </ul>
                </div>
            </div>
        </>
        // </Router>
    );
}

export default GamingWebsite;