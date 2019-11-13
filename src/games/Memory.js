import React, {useState} from 'react';
import Board from './Board';

import { deepCopy, randomizeArray } from '../helperFunctions';
// const randomizeArray = a => a.map( v => v);

const Square = ({visable, handleClick, val, index}) => (
  <button className={`square ${visable}`} index={index} onClick={()=> handleClick(index)}>
    {visable?val:''}
  </button>);

const StartState = (row = 4, col = 4, player0name = localStorage.player0name || 'Player 1', player1name = localStorage.player1name || 'Player 2') => {

  return {
    turn: 0,
    players: [{ name: player0name, score: 0 }, { name: player1name, score: 0 }],
    status: `${player1name}'s turn.`,
    row: row,
    col: col,
    timer: 2,
    guesses: [],
    peices: randomizeArray( new Array(row*col).fill('').map((v,i) => { return { val:Math.floor(i/2)+1, visable: null }; } ) )
  };
};

const Display = ({ gameState, handleResetClick, handlePlayerUpdate }) => {
  const {turn, players, message}=gameState;
  let playersComponents = players.map((v,i) => {
    return (<div className={`player ${i === turn ? 'active' : ''}`}><input type="text" value={v.name} onChange={(e) => handlePlayerUpdate(e,i)}/> Score: {v.score}</div>);
  });
  return (
    <div className="display">
      <div className="message">{message}</div>
      <div className="status">{`${players[turn].name}'s turn.`}</div>
      {playersComponents}
      <button onClick={handleResetClick}>Reset</button>
    </div>
);};

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
    if (newState.guesses.length === 2) { return; }
    if (newState.guesses.length < 2 && newState.peices[index].visable === null){
      newState.peices[index].visable = 'selected';
      newState.guesses.push(index)
    }
    if (newState.guesses.length === 2){
      if (newState.peices[newState.guesses[0]].val === newState.peices[newState.guesses[1]].val){
        newState.players[newState.turn].score += 1;
        newState.status = "That's a Match!";
      }
      else {
        newState.status = "Not a Match.";
      }
    }
    setGameState(newState);
    if(newState.guesses.length === 2){ 
      setTimeout(()=>{
        let newNewState = deepCopy(newState);
        if (newNewState.status === "That's a Match!"){
          newNewState.guesses.forEach(v => newNewState.peices[v].visable = '' + newNewState.turn);
        }
        else{
          newNewState.turn = newNewState.turn === 0 ? 1 : 0;
          newNewState.guesses.forEach(v => newNewState.peices[v].visable = null);
        }
        newNewState.guesses = [];
        setGameState(newNewState);
    },2000); }
  };

  const handleResetClick = () => setGameState(StartState());

  const handlePlayerUpdate = (e,pi) => {
    localStorage[`player${pi}name`] = e.target.value;
    let players = gameState.players.map((v, i) => pi === i ? { ...v, name: e.target.value } : v);
    setGameState(
    {...deepCopy(gameState),
        players: gameState.players.map((v, i) => pi === i ? { ...v, name: e.target.value}:v)}
    );
    }
  return (
    <div className="game">
      <div className="title">
        <h1>Memory</h1>
      </div>
      <Display gameState={gameState} handleResetClick={handleResetClick} handlePlayerUpdate={handlePlayerUpdate}/>
      <Board row={gameState.row} col={gameState.col} squares={gameState.peices.map((v,i)=><Square visable={v.visable} val={v.val} index={i} key={i} handleClick={handleSquareClick}/>)}/>
    </div>);
};