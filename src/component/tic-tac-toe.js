import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './modal.css'; // Import your CSS file for styling
import './index.css';

import CompImg from './char1.png';
import PlayerImg from './char2.png';
import Draw from './draw1.png';
// const BOARD_SIZE = 3;

const PLAYER_HUMAN = 'X';
const PLAYER_AI = 'O';
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
  var INITIAL_PL = props.player === 'AI'? PLAYER_AI : PLAYER_HUMAN;
    const [board, setBoard] = useState(Array(9).fill(EMPTY_CELL));
    const [currentPlayer, setCurrentPlayer] = useState(INITIAL_PL);
    const [winner, setWinner] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    // const [playerWin, setPlayerWin] = useState(0);
    // const [compWin, setcompWin] = useState(0);

    useEffect(() => {
        if (!winner && currentPlayer === PLAYER_AI) {
          setTimeout(() => {
            makeAIMove();
          }, 500);
        }
    }, [board, currentPlayer, winner]);
    

    useEffect(()=>{
        checkpmtWinner(board);
    },[board]);

    const handleClick = (index) => {
        if (!board[index] && !winner) {
          const newBoard = [...board];
          newBoard[index] = currentPlayer;
          setBoard(newBoard);
          checkWinner(newBoard, currentPlayer);
          setCurrentPlayer(currentPlayer === PLAYER_HUMAN ? PLAYER_AI : PLAYER_HUMAN);
        }
      };


      const checkpmtWinner = (board) => {
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
          const [a, b, c] = WINNING_COMBINATIONS[i];
          if (board[a] === PLAYER_AI && board[b] === PLAYER_AI && board[c] === PLAYER_AI) {
            setWinner(PLAYER_AI);
            openModal();
            if(sessionStorage.getItem("compWin"))
            sessionStorage.setItem("compWin",parseInt(sessionStorage.getItem("compWin"))+1);
            else
            sessionStorage.setItem("compWin",1);
            return PLAYER_AI;
          }

          if (board[a] === PLAYER_HUMAN && board[b] === PLAYER_HUMAN && board[c] === PLAYER_HUMAN) {
            setWinner(PLAYER_HUMAN);
            // setPlayerWin(playerWin+1);
            openModal();
            if(sessionStorage.getItem("playerWin"))
            sessionStorage.setItem("playerWin",parseInt(sessionStorage.getItem("playerWin"))+1);
            else
            sessionStorage.setItem("playerWin",1);
            return PLAYER_HUMAN;
          }

          
        }
        if (board.every(cell => cell !== EMPTY_CELL)) {
          setWinner('draw');
          openModal();
          return 'draw';
        }

        return '';
      };

      const checkWinner = (board) => {
        for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
          const [a, b, c] = WINNING_COMBINATIONS[i];
          if (board[a] === PLAYER_AI && board[b] === PLAYER_AI && board[c] === PLAYER_AI) {
            //setWinner(PLAYER_AI);
            return PLAYER_AI;
          }

          if (board[a] === PLAYER_HUMAN && board[b] === PLAYER_HUMAN && board[c] === PLAYER_HUMAN) {
            //setWinner(PLAYER_HUMAN);
            return PLAYER_HUMAN;
          }

          
        }
        if (board.every(cell => cell !== EMPTY_CELL)) {
          //setWinner('draw');
          return 'draw';
        }

        return '';
      };

      const resetGame = (event) => {
        setBoard(Array(9).fill(EMPTY_CELL));
        setCurrentPlayer(event);
        setWinner(null);
      };


  const makeAIMove = () => {
    const bestMove = getBestMove(board, PLAYER_AI);
    const newBoard = [...board];
    newBoard[bestMove.index] = PLAYER_AI;
    setBoard(newBoard);
    checkWinner(newBoard, PLAYER_AI);
    setCurrentPlayer(PLAYER_HUMAN);
  };

  const getBestMove = (board, player) => {
    let bestMove = { score: player === PLAYER_AI ? -Infinity : Infinity, index: null };

    for (let i = 0; i < board.length; i++) {
      if (board[i] === EMPTY_CELL) {
        const newBoard = [...board];
        newBoard[i] = player;
        const score = minimax(newBoard, 0, false);
        console.log(score);
        if ((player === PLAYER_AI && score > bestMove.score) || (player === PLAYER_HUMAN && score < bestMove.score)) {
          bestMove.score = score;
          bestMove.index = i;
        }
      }
    }

    return bestMove;
  };

  function minimax(board, depth, isMaximizing) {
    //console.log(board);
    const result = checkWinner(board);
    //console.log(result);
    //console.log("pee");
    
      if (result === PLAYER_AI) {
        return 10 - depth;
      } else if (result === PLAYER_HUMAN) {
        return depth - 10;
      } else if(result === 'draw') {
        return 0;
      }
      
    

     //console.log("hii");

    // console.log(board);
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === EMPTY_CELL) {
          const newBoard = [...board];
          newBoard[i] = PLAYER_AI;
          const score = minimax(newBoard, depth + 1, false);
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === EMPTY_CELL) {
          const newBoard = [...board];
          newBoard[i] = PLAYER_HUMAN;
          const score = minimax(newBoard, depth + 1, true);
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }

    // console.log("xxx");
  }

  let scores = {
    'X': 1,
    'O': -1,
    'Tie': 0
  };


  const renderCell = (index) => (
    <div className="col1">
    <button
      className="cell"
      onClick={() => handleClick(index)}
    >
      {(board[index]==='X' && <img className="game-img" src={PlayerImg} alt="Humans vs Humans" />) || (board[index]==='O' && <img className='game-img' src={CompImg} alt="Humans vs Humans" />)}
    </button>
    </div>
  );

  return (
      <div className='App'>
      {/* <h1>Tic Tac Toe</h1> */}
      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>

      <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className="custom-modal" 
      overlayClassName="custom-overlay" 
      >
        <div className='btns'>  
            <>
            <div className='WinnerCont'>
            {((winner === 'X') &&<img src={PlayerImg} className='game-image'></img>) ||  ((winner === 'O') && <img src={CompImg} className='game-image'></img>)}
            <span className='WinnerDeclaration'> {(winner === 'X' && "You Win! Congratulations") || (winner === 'O' && "You lose! Hard Luck") || "It's a Draw"} </span>
            </div>
            </>
        </div>
        </Modal>
      
      <div className='score-board'>
        <div>
        <img className="game-img1" src={PlayerImg} alt="Humans vs Humans" />
        <span>{sessionStorage.getItem("playerWin") || 0}</span>
        </div>
        <div>
        <img className="game-img1" src={CompImg} alt="Humans vs Humans" />
        <span>{sessionStorage.getItem("compWin") || 0}</span>
        </div>
        {/* <div> */}
        {/* <img className="game-img" src={Draw} alt="Humans vs Humans" />
          <span>5</span>
        </div> */}

      </div>
      { /*winner && (
        <div className="winner">
         { {winner === 'draw' ? 'It\'s a Tie!' : `Winner: ${winner === 'O' ? 'AI' : 'HUMAN'}`} }
        </div>
      )*/}
    </div>
  );
};

export default Game;
