import React, {useState} from 'react';
import Board from './Board';

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
    let newState = gameState.peices.map(v=>v);
    newState[index] = 'X';
    setGameState({peices: newState});
  };
  // const handleClick = index => {
  //   if(gameState.peices[index]){
  //     const status = gameState.status;
  //     setGameState({status: 'BAD MOVE'});
  //     setTimeout(()=>{
  //       setGameState({state: status});
  //     },1000);
  //   }
  //   else{
  //     //handle game state
  //   }
  // };

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