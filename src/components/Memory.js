import React, {useState} from 'react';
import Board from './Board';

import {deepCopy, randomizeArray} from '../helperFunctions';

const Square = ({visable, handleClick, val, index}) => (
  <button className={`square ${visable}`} index={index} onClick={()=> handleClick(index)}>
    {visable?val:''}
  </button>);

const StartState = (row = 4, col = 4, player1name = 'Player 1', player2name = 'Player 2') => {
  return {
    turn: 0,
    players: [{ name: player1name, score: 0 }, { name: player2name, score: 0 }],
    status: `${player1name}'s turn.`,
    row: row,
    col: col,
    timer: 2,
    guesses: [],
    peices: randomizeArray( new Array(row*col).fill('').map((v,i) => { return { val:Math.floor(i/2)+1, visable: null }; } ) )
  };
};

const Display = ({ status, player1, player2, handleResetClick}) => (
  <div className="display">
    {status}
    <input type="text" value={player1.name} />
    's Score:{player1.score}
    <input type="text" value={player2.name} />
    's Score:{player2.score}
    <button onClick={handleResetClick}>Reset</button>
  </div>
);

export default ()=>{
  const [gameState, setGameState] = useState(StartState());

  // const handleSquareClick = index => {
  //   let newState = deepCopy(gameState);
  //   if(newState.peices[index].visable){
  //     newState.peices[index].visable += 'BAD';
  //     newState.status = 'BAD MOVE';
  //     setGameState(newState);
  //     setTimeout(()=>{
  //       setGameState({...deepCopy(gameState), status: `${gameState.players[gameState.turn].name}'s turn.`});
  //     },gameState.timer * 1000);
  //   }
  //   else if(newState.guess){
  //     newState.guess = index;    
  //     newState.peices[index].visable = 'SELECTED';
  //     setGameState(newState);
  //   }
  //   else if (newState.peices[index].val === newState.peices[newState.guess].val) {
  //     newState.peices[index].visable = '' + newState.turn;
  //     newState.peices[newState.guess].visable = '' + newState.turn;
  //     newState.status = 'Match';
  //     newState.guess = null;
  //     newState.players[newState.turn].score += 1;
  //     setGameState(newState);
  //     setTimeout(() => {
  //       setGameState({ ...deepCopy(newState), status: `${newState.players[newState.turn].name}'s turn.` });
  //     }, gameState.timer * 1000);
  //   }
  //   else{
  //     newState.peices[index].visable = 'SELECTED';
  //     newState.status = 'Not a Match';
  //     newState.turn = newState.turn === 0 ? 1 : 0;
  //     setGameState(newState);
  //     setTimeout(() => {
  //       let newNewState = deepCopy(newState);
  //       newNewState.status = `${gameState.players[gameState.turn].name}'s turn.`
  //       newNewState.peices[index].visable = null;
  //       newNewState.peices[newNewState.guess].visable = null;
  //       newNewState.guess = null;
  //       setGameState(newNewState);
  //     }, gameState.timer * 1000);
  //   }
  // };

  // const handleSquareClick = index => {
  //   let newState = deepCopy(gameState);
  // if (newState.guesses.length > 2 || newState.peices[index].visable) {
  //   newState.peices[index].visable += 'BAD';
  //   newState.status = 'BAD MOVE';
  // }
  // else if(){}
  // };

  const handlePlayer1NameChange = (e, player) => setGameState({ ...deepCopy(gameState), players: gameState.players.map((v, i) => i === player ? { ...v, name: e.value }:{...v})});

  const handleSquareClick = index => {
    let newState = deepCopy(gameState);
    if (newState.guesses.length < 2){
      newState.peices[index].visable = 'selected';
      newState.guesses.push(index)
      setGameState(newState);
    }
    if(newState.guesses.length > 1){ 
      setTimeout(()=>{
        let newState = deepCopy(gameState);
        newState.guesses.forEach(v=> newState.peices[v].visable = null);
        newState.guesses = [];
        newState.turn = newState.turn === 0? 1:0;
        newState.status = `${newState.players[newState.turn].name}'s turn.` // should be refactored into the display componant
        setGameState(newState);
    },3000); }
  };

  const handleResetClick = () => setGameState(StartState());

  return (
    <div className="game">
      <div className="title">
        <h1>Memory</h1>
      </div>
      <Display status={gameState.status} player1={gameState.players[0]} player2={gameState.players[1]} handleResetClick={handleResetClick}/>
      <Board row={gameState.row} col={gameState.col} squares={gameState.peices.map((v,i)=><Square visable={v.visable} val={v.val} index={i} key={i} handleClick={handleSquareClick}/>)}/>
    </div>);
};