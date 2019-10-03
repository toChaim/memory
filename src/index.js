import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

// Functions
Array.prototype.radomize = () => this.forEach((v,i,a)=>console.log(v,i));

// Attoms
const Btn = ({handleClick, buttonText, className})=>(
  <button className={className + ' btn'} 
    onClick={() => handleClick(buttonText)}>
    {buttonText}
  </button>);

// Molecules
const Board = ({row, col, peices} = {row:3, col:3, peices:[]})=>{
  document.documentElement.style.setProperty('--row', row);
  document.documentElement.style.setProperty('--col', col);
  console.log(row, col);
  let squares = new Array(row * col).fill(1).map((v,i)=>(<div className="square"><button>{i}</button></div>));
  return (<div className="board">{squares}</div>);
};

const NavBar = ({Games, handleClick, game})=>{
  let gamesList = Object.keys(Games).map( g => (<li><Btn className={game===g? 'selected':'not'} handleClick={handleClick} buttonText={g} /></li>));
  return (<nav>
    <ul>
      Games
      {gamesList}
    </ul>
  </nav>);
};

// Data
const Games = {
  'Tic Tac Toe': {
    Board: Board
  },
  'Memory': {
    row: 4,
    col: 4,
    Board: Board
  }
};

const Display = ({row, col, setRow, setCol})=>{
  // let inputs = Object.keys(gameState).map(v => (<li>
  //   <label>{v}:<input name={v} type="number" value={'gameState[v]'} onChange={()=>console.log('()=>setGameState(gameState)')} /></label>
  //   </li>));
  return (
    <div className="display">
      <ul>Game Sate:
        <li>row: <input type="number" value={row} onChange={e => setRow(e.target.value)}/></li>
        <li>col: <input type="number" value={col} onChange={e => setCol(e.target.value)}/></li>
      </ul>
    </div>);
};
const Game = ({game})=>{
  let [row, setRow] = useState(Games[game]['row'] || 3);
  let [col, setCol] = useState(Games[game]['col'] || 3);

  return (
    <div className="game">
      <div className="title">
        <h1>{game}</h1>
      </div>
      <Display row={row} setRow={setRow} col={col} setCol={setCol}/>
      <Board row={row} col={col} />
    </div>);
};
const App = () => {
  const [game, setGame] = useState('Memory');
  
  return (<div className="container">
    <NavBar Games={Games} game={game} handleClick={setGame}/>
    <Game game={game} />
  </div>);
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
