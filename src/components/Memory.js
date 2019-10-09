import React, {useState} from 'react';
import Board from './Board';

import {deepCopy, randomizeArray} from '../helperFunctions';
// old code
// const MemorySquar = ({val, handleClick, selected})=>{
//   return <div className={selected?'square selected':'square'}><button onClick={()=>handleClick(val)}>{selected?val:''}</button></div>;
// };

// tic tac toe code
// export default ()=>{
//   return (<div className="game">Memory</div>);
// };

// const getTurn = arr => arr.reduce((t,v)=> t += !!v, 0) % 2? 'O':'X';
// const getGameStatus = arr => {
//   for(let i = 0; i < 3; i++){
//     if(arr[i*3] && arr[i*3] === arr[i*3+1] &&  arr[i*3] === arr[i*3+2]){ return arr[i*3] + ' wins!!!'; }
//     if(arr[i] && arr[i] === arr[i + 3] && arr[i] === arr[i + 6]){ return arr[i] + ' wins!!!'; }
//   }
//   if(arr[0] && arr[0] === arr[4] && arr[0] === arr[8]){ return arr[0] + ' wins!!!'; }
//   if(arr[2] && arr[2] === arr[4] && arr[2] === arr[6]){ return arr[2] + ' wins!!!'; }
//   let moves = arr.reduce((t,v)=> t + !!v,0)
//   if(moves === 9){ return 'Tie Game.'}
//   return `Player ${moves % 2? 'O':'X'}'s move.`;
// }

const Square = ({selected, handleClick, val, index}) => (
  <button className={`square ${val < 0?'selected':''}`} index={index} onClick={()=> handleClick(index)}>
    {Math.abs(val)}
  </button>);

const StartState = {
  player1name: 'Player 1',
  player2name: 'Player 2',
  row: 4,
  col: 4,
  peices: randomizeArray(new Array(16).fill('').map((v,i) => Math.floor(i/2)+1)),
  status: 'Player 1\'s turn.'
};

export default ()=>{
  const [gameState, setGameState] = useState(StartState);

  const handleSquareClick = index => {
    // if(gameState.peices[index]){
    //   const newState = {...deepCopy(gameState), status:'BAD MOVE'};
    //   setGameState(newState);
    //   setTimeout(()=>{
    //     setGameState({...deepCopy(gameState), status: getGameStatus(gameState.peices)});
    //   },1000);
    // }
    // else{
    let newState = deepCopy(gameState);
    newState.peices[index] *= -1;
    // newState.status = getGameStatus(newState.peices);
    setGameState(newState);
    // }
  };

  const handleResetClick = () => setGameState(StartState);

  return (
    <div className="game">
      <div className="title">
        <h1>Memory</h1>
      </div>
      <div className="display">
        {gameState.status}
        <button onClick={handleResetClick}>Reset</button>
      </div>
      <Board row={gameState.row} col={gameState.col} squares={gameState.peices.map((v,i)=><Square val={v} index={i} handleClick={handleSquareClick}/>)}/>
    </div>);
};