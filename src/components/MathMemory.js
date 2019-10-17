import React, { useState } from 'react';
import Board from './Board';

import { deepCopy, randomizeArray } from '../helperFunctions';

const Square = ({ visable, handleClick, val, index }) => (
  <button className={`square ${visable}`} index={index} onClick={() => handleClick(index)}>
    {visable ? val : ''}
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
    peices: randomizeArray(new Array(row * col).fill('').map((v, i) => { return { val: (i + 1) % 10, visable: 'unselected' }; }))
  };
};

const Display = ({ gameState, handleResetClick, handlePlayerUpdate }) => {
  const { turn, players, message } = gameState;
  let playersComponents = players.map((v, i) => {
    return (<div className={`player ${i === turn ? 'active' : ''}`}><input type="text" value={v.name} onChange={(e) => handlePlayerUpdate(e, i)} /> Score: {v.score}</div>);
  });
  return (
    <div className="display">
      <div className="message">{message}</div>
      <div className="status">{`${players[turn].name}'s turn.`}</div>
      {playersComponents}
      <button onClick={handleResetClick}>Reset</button>
    </div>
  );
};

export default () => {
  const [gameState, setGameState] = useState(StartState());
  const handleResetClick = () => setGameState(StartState());
  const handlePlayerUpdate = (e, pi) => {
    localStorage[`player${pi}name`] = e.target.value;
    let players = gameState.players.map((v, i) => pi === i ? { ...v, name: e.target.value } : v);
    setGameState(
      {
        ...deepCopy(gameState),
        players: gameState.players.map((v, i) => pi === i ? { ...v, name: e.target.value } : v)
      }
    );
  }
  const handleSquareClick = index => {
    if(gameState.guesses.length >= 2) { return; }
    if (gameState.peices[index].visable === 'unselected'){ return; }

    let newState = deepCopy(gameState);
    if (newState.guesses.length < 2) {
      newState.peices[index].visable = 'selected';
      newState.guesses.push(index);
    }
    if (newState.guesses.length === 2) {
      if (newState.peices[newState.guesses[0]].val === newState.peices[newState.guesses[1]].val) {
        newState.players[newState.turn].score += 1;
        newState.status = "That's a Match!";
      }
      else {
        newState.status = "Not a Match.";
      }
    }
    setGameState(newState);
    if (newState.guesses.length === 2) {
      setTimeout(() => {
        let newNewState = deepCopy(newState);
        if (newNewState.status === "That's a Match!") {
          newNewState.guesses.forEach(v => newNewState.peices[v].visable = '' + newNewState.turn);
        }
        else {
          newNewState.turn = newNewState.turn === 0 ? 1 : 0;
          newNewState.guesses.forEach(v => newNewState.peices[v].visable = null);
        }
        newNewState.guesses = [];
        setGameState(newNewState);
      }, 2000);
    }
  };
  return (<div className="game">
    <Display gameState={gameState} handleResetClick={handleResetClick} handlePlayerUpdate={handlePlayerUpdate} />
    <Board row={gameState.row} col={gameState.col} squares={gameState.peices.map((v, i) => <Square visable={v.visable} val={v.val} index={i} key={i} handleClick={handleSquareClick} />)} />
  </div>);
};