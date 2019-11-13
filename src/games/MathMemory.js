import React, { useState } from 'react';
import Board from '../components/Board';

import { deepCopy, randomizeArray } from '../helperFunctions';

const Square = ({ visable, handleClick, val, index }) => (
  <button className={`square ${visable}`} index={index} onClick={() => handleClick(index)}>
    {visable ? val : ''}
  </button>);
  
const MathMemory = () => {
  // game settings
  const [row, setRow] = useState(4);
  const [col, setCol] = useState(4);
  const [targetNumber, setTargetNumber] = useState(Math.ceil(Math.random() * 10));
  let values = [];
  for (let i = 0; i < row * col; i += 2) {
    let newNumber = Math.ceil(Math.random() * 10);
    values.push(newNumber, Math.abs(targetNumber - newNumber));
  }
  const [squareValues, setSquareValues] = useState(randomizeArray(values));
  const [squareVisablity, setSquareVisablity] = useState(new Array(row * col).fill('yes'));

  // leagal move check
  const moveCheck = (i) => {
    if (squareVisablity[i] && squareVisablity[i] !== 'yes') { return; }
    if (squareVisablity.reduce((t,v) => t + v === 'selected',0) >= 2) { return; }
    
  };
  // game logic


  const squares = squareValues.map((v,i) => (<Square visable={squareVisablity[i]} handleClick={()=> {}} val={v} index={i}/>));
  return (<div className="game">
    <div className="display">display</div>
    <Board row={row} col={col} squares={squares} />
  </div>);
};

export default MathMemory;



// const Display = ({ turn, players, message, handleResetClick, handlePlayerUpdate }) => {
//   // let playersComponents = players.map((v, i) => {
//   //   return (<div className={`player ${i === turn ? 'active' : ''}`}><input type="text" value={v.name} onChange={(e) => handlePlayerUpdate(e, i)} /> Score: {v.score}</div>);
//   // });
//   return (
//     <div className="display">
//       {/* <div className="message">{message}</div>
//       <div className="status">{`${players[turn].name}'s turn.`}</div>
//       {playersComponents}
//       <button onClick={handleResetClick}>Reset</button> */}
//       Display
//     </div>
//   );
// };

// const MathMemory = () => {
//   // game settings
//   const [row, setRow] = useState(4);
//   const [col, setCol] = useState(4);
//   let values = new Array(row * col).fill(1).map(v => Math.ceil(Math.random() * 10));
//   const [squareValues, setSquareValues] = useState(values);
//   // should change this to make pairs
//   const [players, setPlayers] = useState(localStorage.players || { names: ['Player 1', 'Player 2'], scores: [0,0] });
//   // need to add timer and range for target

//   // game status
//   const [turn, setTurn] = useState(-1);
//   const [targetNumber, setTargetNumber] = Math.ceil(Math.random() * 10);
//   const [squareVisablity, setSquareVisablity] = useState(new Array(row*col).fill(null));
//   const [guesses,setGuessese] = useState([]);

//   const gameLogic = id => {
//     if(guesses.length >= 2){ return; }
//     setSquareVisablity(squareValues.map((v, i) => i === id ? 'selected' : v));
//   };

//   let squares = squareValues.map((v, i) => <Square visable={squareVisablity[i]} val={v} index={i} key={i} handleClick={() => gameLogic(i)} />);

//   return (<div className="game">
//     <Display turn={turn} players={'playersNames'} handleResetClick={'handleResetClick'} handlePlayerUpdate={'handlePlayerUpdate'} />
//     <Board row={row} col={col} squares={squares} />
//   </div>);

// };

// export default MathMemory;

// // const StartState = (row = 4, col = 4, player0name = localStorage.player0name || 'Player 1', player1name = localStorage.player1name || 'Player 2') => {
// //   const [turn, setTurn] = useState(0);
// //   const [playersName, setPlayersName] = useState(localStorage.playersName || ['Player 1', 'Player 2']);
// //   const [playersScore, setPlayersScore] = useState(localStorage.playersName || [0, 0]);
// //   const [message, setMessage] = '';
// //   const [boardSize, setBoardSize] = useState([4,4]);
// //   const [timer, setTimer] = useState(2);
// //   const [piecesValue, setPiecesValue] = userState()
// //   return {
// //     turn: 0,
// //     players: [{ name: player0name, score: 0 }, { name: player1name, score: 0 }],
// //     status: `${player1name}'s turn.`,
// //     row: row,
// //     col: col,
// //     timer: 2,
// //     guesses: [],
// //     peices: randomizeArray(new Array(row * col).fill('').map((v, i) => { return { val: (i + 1) % 10, visable: 'unselected' }; }))
// //   };
// // };

// // export default () => {
// //   const [gameState, setGameState] = useState(StartState());
// //   const handleResetClick = () => setGameState(StartState());
// //   const handlePlayerUpdate = (e, pi) => {
// //     localStorage[`player${pi}name`] = e.target.value;
// //     let players = gameState.players.map((v, i) => pi === i ? { ...v, name: e.target.value } : v);
// //     setGameState(
// //       {
// //         ...deepCopy(gameState),
// //         players: gameState.players.map((v, i) => pi === i ? { ...v, name: e.target.value } : v)
// //       }
// //     );
// //   }
// //   const handleSquareClick = index => {
// //     if(gameState.guesses.length >= 2) { return; }
// //     if (gameState.peices[index].visable === 'unselected'){ return; }

// //     let newState = deepCopy(gameState);
// //     if (newState.guesses.length < 2) {
// //       newState.peices[index].visable = 'selected';
// //       newState.guesses.push(index);
// //     }
// //     if (newState.guesses.length === 2) {
// //       if (newState.peices[newState.guesses[0]].val === newState.peices[newState.guesses[1]].val) {
// //         newState.players[newState.turn].score += 1;
// //         newState.status = "That's a Match!";
// //       }
// //       else {
// //         newState.status = "Not a Match.";
// //       }
// //     }
// //     setGameState(newState);
// //     if (newState.guesses.length === 2) {
// //       setTimeout(() => {
// //         let newNewState = deepCopy(newState);
// //         if (newNewState.status === "That's a Match!") {
// //           newNewState.guesses.forEach(v => newNewState.peices[v].visable = '' + newNewState.turn);
// //         }
// //         else {
// //           newNewState.turn = newNewState.turn === 0 ? 1 : 0;
// //           newNewState.guesses.forEach(v => newNewState.peices[v].visable = null);
// //         }
// //         newNewState.guesses = [];
// //         setGameState(newNewState);
// //       }, 2000);
// //     }
// //   };
// //   return (<div className="game">
// //     <Display gameState={gameState} handleResetClick={handleResetClick} handlePlayerUpdate={handlePlayerUpdate} />
// //     <Board row={gameState.row} col={gameState.col} squares={gameState.peices.map((v, i) => <Square visable={v.visable} val={v.val} index={i} key={i} handleClick={handleSquareClick} />)} />
// //   </div>);
// // };