import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import TicTacToe from './components/TicTacToe';
import Memory from './components/Memory';
import MathMemory from './components/MathMemory';

// Attoms
const Btn = ({handleClick, buttonText, className})=>(
  <button className={className + ' btn'} 
    onClick={() => handleClick(buttonText)}>
    {buttonText}
  </button>);

// Data
const Games = {
  'Tic Tac Toe': <TicTacToe />,
  'Memory': <Memory />,
  'Math Memory': <MathMemory />
};

const NavBar = ({Games, handleClick, game})=>{
  let gamesList = Object.keys(Games).map( g => (<li key={g}><Btn className={game===g? 'selected':'not'} handleClick={handleClick} buttonText={g} /></li>));
  return (<nav>
    <ul>
      Games
      {gamesList}
    </ul>
  </nav>);
};

// const Display = ({row, col, setRow, setCol})=>{
  
//   return (
//     <div className="display">
//         row: <input type="number" value={row} onChange={e => setRow(e.target.value)}/>
//         col: <input type="number" value={col} onChange={e => setCol(e.target.value)}/>
//       {/* <Btn handleClick={() => setGameStatus('start')} buttonText={Start} /> */}
//     </div>);
// };

// const Game = ({game})=>{
//   let [row, setRow] = useState(Games[game]['row'] || 3);
//   let [col, setCol] = useState(Games[game]['col'] || 3);
//   let [gameStatus, setGameStatus] = useState(Games[game]['status'] || new Array(row*col).fill(1).map((v,i)=>{return {val: i, selected: false};}));
//   let selectSquare = val => {
//     let state = gameStatus.map(v => { return {...v}; });
//     state[val].selected = !state[val].selected;
//     setGameStatus(state);
//   }
//   let squares = gameStatus.map((v)=> <MemorySquar val={v.val} selected={v.selected} handleClick={selectSquare}/>);

//   return (
//     <div className="game">
//       <div className="title">
//         <h1>{game}</h1>
//       </div>
//       <Display row={row} setRow={setRow} col={col} setCol={setCol}/>
//       <Board row={row} col={col} squares={squares}/>
//     </div>);
// };

const App = () => {
  const [game, setGame] = useState('Memory');
  
  return (<div className="container">
    <NavBar Games={Games} game={game} handleClick={setGame}/>
    {Games[game]}
  </div>);
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
