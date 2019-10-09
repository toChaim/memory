import React, {useState} from 'react';
import Board from './Board';

import {deepCopy, randomizeArray} from '../helperFunctions';

const Square = ({selected, handleClick, val, index}) => (
  <button className={`square ${val < 0?'selected':''}`} index={index} onClick={()=> handleClick(index)}>
    {val < 0?Math.abs(val):''}
  </button>);

const StartState = (row = 4, col = 4, player1name = 'Player 1', player2name = 'Player 2') => {
  return {
    guess: null,
    turn: 0,
    players: [{ name: player1name, score: 0 }, { name: player2name, score: 0 }],
    status: `${player1name}'s turn.`,
    row: row,
    col: col,
    peices: randomizeArray(new Array(row*col).fill('').map((v,i) => Math.floor(i/2)+1))
  };
};

export default ()=>{
  const [gameState, setGameState] = useState(StartState());

  const handleSquareClick = index => {
    let newState = deepCopy(gameState);

    if(gameState.peices[index] < 0){
      const oldStatus = gameState.status;
      newState.status = 'BAD MOVE';
      setTimeout(()=>{
        setGameState({...deepCopy(gameState), status: oldStatus});
      },1000);
    }
    else if(gameState.guess === null){
      newState.peices[index] *= -1;
      newState.guess = index;
      // newState.status = getGameStatus(newState.peices);
      setGameState(newState);
    }
    else if(gameState.peices[gameState.guess] === gameState.peices[index]){
      newState.peices[index] *= -1;
      newState.guess = null;
      newState.players[newState.turn].score += 1;
      newState.turn = Number(!newState.turn);
      newState.status = `${newState.players[newState.turn].name}'s turn.`;
    }
    else {
      newState.peices[newState.guess] *= -1;
      newState.guess = null;
      newState.turn = Number(!newState.turn);
      newState.status = `${newState.players[newState.turn].name}'s turn.`;
    }
    setGameState(newState);
  };

  const handleResetClick = () => setGameState(StartState());

  return (
    <div className="game">
      <div className="title">
        <h1>Memory</h1>
      </div>
      <div className="display">
        {gameState.status}
        <button onClick={handleResetClick}>Reset</button>
      </div>
      <Board row={gameState.row} col={gameState.col} squares={gameState.peices.map((v,i)=><Square val={v} index={i} key={i} handleClick={handleSquareClick}/>)}/>
    </div>);
};