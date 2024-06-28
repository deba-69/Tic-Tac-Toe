
import React, { useState } from "react";
import Game from "./tic-tac-toe";
import './index.css';
export default function Btn(){
    const [player,setPlayer] = useState('HUMAN');
    const [id,setId] = useState(0);

    const ai = () =>{
        setPlayer('AI');
        setId(id => id + 1);
   }

   const human = () => {
        setPlayer('HUMAN');
        setId(id => id + 1);
    }
    return(
        <>
        <div className="main-container">
          <div className="background-image">
            <div className="flex-cont">
            <Game key = {id} player = {player}></Game>
          <div className="btns">
            <button  className='btn btn-success my-3' onClick={human}>Start with Player</button>
            <button className='btn btn-danger my-3' onClick={ai}>Start with AI</button>
          </div>
         
        </div>
        </div>
        </div>
        </>
      )
}