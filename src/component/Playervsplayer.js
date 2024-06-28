import React, { useState, useEffect } from 'react';
import './index.css';
import Modal from 'react-modal';
import './modal.css'; 

import Player2Img from './char3.png';
import PlayerImg from './char2.png';
import Draw from './draw1.png';
// const BOARD_SIZE = 3;

const PLAYER1 = 'X';
const PLAYER2 = 'O';
const EMPTY_CELL = '';

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

  //console.log(initialBoard,!initialBoard[0][0]);

const Game = (props) => {
//   var INITIAL_PL = props.player === 'AI'? PLAYER2 : PLAYER1;
    const [board, setBoard] = useState(Array(9).fill(EMPTY_CELL));
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER1);
    const [newPlayer,setNewPlayer] = useState(PLAYER1);
    const [winner, setWinner] = useState("");
    const [clientId, setClientId] = useState("");
    const [ws,setWs] = useState(null);
    const [message,setMessage] = useState("");
    const [players, setPlayer] = useState("");
    const [dispSpinner, setDispSpinner] = useState(false);

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [playerWin, setPlayerWin] = useState(0);
    const [compWin, setcompWin] = useState(0);



    useEffect(() => {
      const newWs = new WebSocket('ws://192.168.29.144:8000');
      setWs(newWs);

      newWs.onmessage = (event) => {

        const data = JSON.parse(event.data);
        if(data.type === "init")
        {
          setClientId(data.clientId);
          console.log(data.clientId);
          setBoard(Array(9).fill(''));
        }
        else if(data.type === "setCurrPlayer")
        {
          console.log("player changed");
          setCurrentPlayer(data.clientId);
          setBoard(data.board);
          console.log(data.board);
        }
        else if(data.type === "setPlayers")
        {
          setPlayer(data.playerId);
          setCurrentPlayer(data.playerId.player1);
          setBoard(Array(9).fill(''));
          setWinner("");
          sessionStorage.clear();
          setDispSpinner(false);
        }
        else if(data.type === "setBoard")
        {
          setBoard(data.board);
          setCurrentPlayer(data.clientId);
          setWinner("");
          console.log(board);
        }
      };

      return () => {
        newWs.close();
      }

    },[]);
    

    useEffect(()=>{
        checkpmtWinner(board);
    },[board]);

    const handleClick = (index) => {
        if (!board[index] && !winner) {

          if(currentPlayer === clientId)
          {
            console.log("current Player : "+currentPlayer+ " Client : "+clientId);
            if(ws)
            {
              ws.send(JSON.stringify({type: "move", clientId, index}));
            }
            else
            {
              console.log("current Player : "+currentPlayer+ " Client : "+clientId);
            }
            //const newBoard = [...board];
            //newBoard[index] = currentPlayer;
            //setBoard(newBoard);
            //checkpmtWinner(newBoard, currentPlayer);
           // setCurrentPlayer(currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
          }
        }
      };


      const checkpmtWinner = (board) => {
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
          const [a, b, c] = WINNING_COMBINATIONS[i];
          if (board[a] === PLAYER2 && board[b] === PLAYER2 && board[c] === PLAYER2) {
            setWinner(PLAYER2);
            openModal();
            if(sessionStorage.getItem("player2Win"))
            sessionStorage.setItem("player2Win",parseInt(sessionStorage.getItem("player2Win"))+1);
            else
            sessionStorage.setItem("player2Win",1);
            // setBoard(Array(9).fill(EMPTY_CELL));
            // setWinner(players.player2Name);
            // alert(`${players.player2Name} won the match`);
            return PLAYER2;
          }

          if (board[a] === PLAYER1 && board[b] === PLAYER1 && board[c] === PLAYER1) {
            setWinner(PLAYER1);
            // setPlayerWin(playerWin+1);
            openModal();
            if(sessionStorage.getItem("player1Win"))
            sessionStorage.setItem("player1Win",parseInt(sessionStorage.getItem("player1Win"))+1);
            else
            sessionStorage.setItem("player1Win",1);
            // setBoard(Array(9).fill(EMPTY_CELL));
            // setWinner(players.player1Name);
            // alert(`${players.player1Name} won the match`);
            return PLAYER1;
          }

          
        }
        if (board.every(cell => cell !== EMPTY_CELL)) {
          setWinner('draw');
          openModal();
          // alert("It's a draw");
        //   setBoard(Array(9).fill(EMPTY_CELL));
          return 'draw';
        }

        return '';
      };

   
      const resetGame = (event) => {
        //setBoard(Array(9).fill(EMPTY_CELL));
        if(ws)
        {
          ws.send(JSON.stringify({type : "resetBoard", clientId}));
        }
        //setNewPlayer(newPlayer === PLAYER1 ? PLAYER2 : PLAYER1);
        //setCurrentPlayer(newPlayer);
        setWinner("");
      };



  const renderCell = (index) => (
    <div className="col1">
    <button
      className="cell"
      onClick={() => handleClick(index)}
    >
      {(board[index]==='X' && <img className="game-img" src={PlayerImg} alt="Humans vs Humans" />) || (board[index]==='O' && <img className='game-img' src={Player2Img} alt="Humans vs Humans" />)}
    </button>
    </div>
  );


  const setId = (message) => {
    if(ws)
    {
      ws.send(JSON.stringify({type: "setId", clientId, name: document.getElementById("name").value}));
      setDispSpinner(true);
    }
  }

  return (
    <>
    <div className='main-container'>
        <div className='background-image'>
            <div className='flex-cont'>

              {
                (players.player1 === undefined || players.player2 === undefined) && dispSpinner &&
                <>
                  <div className='spinner'>
                    {/* <img src={PlayerImg} alt='spinner'></img> */}
                  </div>
                  <p className='spinner-text'>Looking for Player....</p>
                </> 


              }


            { !players.player1 ||!players.player2 ||
            <>
            {
                  players.player1 && players.player2 && (winner === "") && 
                  <>
                  <div className='btns'>
                  <div className='WinnerCont'>
                  {(currentPlayer === players.player1) ? <img src={PlayerImg} className='game-image'></img> : <img src={Player2Img} className='game-image'></img>}
                  {(currentPlayer===clientId) ? "Your Move" : "Opponents Move"}
                  </div>
                  </div>
                  </>
                }
             {/* <h1 className='playerName'><img className="game-img" src={PlayerImg} alt="Humans vs Humans" /> {players.player1Name}   v/s   {players.player2Name}  <img className="game-img" src={Player2Img} alt="Humans vs Humans" /></h1> */}
              <div className='App'>
              
                <div className="board">
                  {board.map((cell, index) => renderCell(index))}
                </div>

                {/* {
                  players.player1 && players.player2 && (winner === "") && 
                  <>
                  <div className='btns'>
                  <div className='WinnerCont'>
                  {(currentPlayer === players.player1) ? <img src={PlayerImg} className='game-image'></img> : <img src={Player2Img} className='game-image'></img>}
                  {(currentPlayer===clientId) ? "Your Move" : "Opponents Move"}
                  </div>
                  </div>
                  </>
                } */}

              <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              className="custom-modal" 
              overlayClassName="custom-overlay" 
              >
                <div className='btns'>  
                    <>
                    <div className='WinnerCont'>
                    {((clientId === players.player1) &&<img src={PlayerImg} className='game-image'></img>) ||  ((clientId === players.player2) && <img src={Player2Img} className='game-image'></img>)}
                    <span className='WinnerDeclaration'> {(winner === 'X' && ((players.player1 === clientId) ? "You Win! Congratulations" : "You Lost! Hard luck")) || (winner === 'O' && ((players.player2 === clientId) ? "You Win! Congratulations" : "You Lost! Hard luck"))  || "It's a Draw"} </span>
                    </div>
                    </>
                </div>
              </Modal>
                

              <div className='score-board'>
                <div>
                  <img className="game-img1" src={PlayerImg} alt="Humans vs Humans" />
                  <span>{sessionStorage.getItem("player1Win") || 0}</span>
                </div>
                <div>
                  <img className="game-img1" src={Player2Img} alt="Humans vs Humans" />
                  <span>{sessionStorage.getItem("player2Win") || 0}</span>
                </div>
              </div>
            </div>
            </>
              }

              {
              (players.player1 !== undefined && players.player2!==undefined) || dispSpinner ||
              <>
              <div className='player-form'>
                <input type='text' placeholder='Enter Your Name' id="name" required></input>
                <button onClick={setId}>Start Game</button>
              </div>
              </>
              }

            <div className='btns'>
                { !(players.player1 && players.player2) || (winner === "") ||
                <>
                  {/* <span className='WinnerDeclaration'> {(winner === 'X' && ((players.player1 === clientId) ? "You Won" : "You Lost! Hard luck")) || (winner === 'O' && ((players.player2 === clientId) ? "You Won" : "You Lost! Hard luck"))  || "It's a Draw"} </span> */}
                 <button onClick={resetGame}>Reset Board</button>
                 </>
                 }
            </div>
        </div>
          
      </div>
    </div>
    </>
  );
};

export default Game;
