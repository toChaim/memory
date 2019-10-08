import React, {useState} from 'react';
import Board from './Board';

import {deepCopy} from '../helperFunctions';

const getTurn = arr => {
  let moves = arr.reduce((t,v)=> t += !!v, 0)
  console.log(moves)
  return  moves % 2? 'O':'X';
}

const Square = ({selected, handleClick, val, index}) => (
  <button className="square" index={index} onClick={()=> handleClick(index)}>
    {val}
  </button>);

export default ()=>{
  const [gameState, setGameState] = useState({
    peices: new Array(9).fill(''),
    status: 'Player X\'s turn.'
  });

  const handleClick = index => {
    if(gameState.peices[index]){
      const oldStatus = gameState.status;
      const newState = {...deepCopy(gameState), status:'BAD MOVE'};
      setGameState(newState);
      setTimeout(()=>{
        setGameState({...deepCopy(gameState), status: getTurn(gameState.peices)});
      },1000);
    }
    else{
      let newState = deepCopy(gameState);
      newState.peices[index] = getTurn(gameState.peices);
      setGameState(newState);
    }
  };

  return (
    <div className="game">
      <div className="title">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="display">{gameState.status}</div>
      <Board row={3} col={3} squares={gameState.peices.map((v,i)=><Square val={v} index={i} handleClick={handleClick}/>)}/>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>);
};