import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

Array.prototype.radomize = () => this.forEach((v,i,a)=>console.log(v,i));
const Board = ({row, col, peices} = {row:3, col:3, peices:[]})=>{
  let squares = new Array(row * col).fill(1).map((v,i)=>(<div className="square"><button>{i}</button></div>));
  return (<div className="board">{squares}</div>);
};
const Games = {
  'Tic Tac Toe': {
    Board: Board
  },
  'Memory': {
    Board: Board
  }
};
const Btn = ({handleClick, buttonText, className})=>(
  <button className={className + ' btn'} 
    onClick={() => handleClick(buttonText)}>
    {buttonText}
  </button>);
const NavBar = ({Games, handleClick, game})=>{
  console.log(Object.keys(Games), game);
  let gamesList = Object.keys(Games).map( g => (<li><Btn className={game===g? 'selected':'not'} handleClick={handleClick} buttonText={g} /></li>));
  return (<nav>
    <ul>
      Games
      {gamesList}
    </ul>
  </nav>);
};
const Display = ({row, col, setRow, setCol})=>{
  // let inputs = Object.keys(gameState).map(v => (<li>
  //   <label>{v}:<input name={v} type="number" value={'gameState[v]'} onChange={()=>console.log('()=>setGameState(gameState)')} /></label>
  //   </li>));
  return (
    <div className="display">
      <ul>Game Sate:
        <li>row: <input type="number" value={row} /></li>
        <li>col: <input type="number" value={col} /></li>
      </ul>
    </div>);
};
const Game = ({game})=>{
  const board = Games[game].Board();

  return (
    <div className="game">
      <div className="title">
        <h1>{game}</h1>
      </div>
      <Display row={3} col={3} />
      {board}
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
