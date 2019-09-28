import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';
// const Games = { 
//   'ticTacToe': (
//     <div className="game">
//       <div className="title">
//         <h1>Tic Tac Toe</h1>
//       </div>
//       <Display />
//       <Board />
//     </div>),
//   'memory': (
//     <div className="game">
//       <div className="title">
//         <h1>Memory</h1>
//       </div>
//       <Display />
//       <div>Memory Board</div>
//     </div>)
// };

// const NavBar = ({chooseGame, game})=>{
//   let gamesList = Object.keys(Games).map( g => <li><button className={} onClick={()=>chooseGame('ticTacToe')}>Tic Tack Toe</button></li>)
//   return (<nav>
//   <ul>
//     <a href="#">Home</a>
    
//     <li><button onClick={()=>chooseGame('memory')}>Memory</button></li>
//   </ul>
// </nav>);
// }
// const Display = ()=>{
//   return (
//     <div className="display">
//       <h1>Next player: X</h1>
//       <button>Controles</button>
//     </div>);
// };
// const Board = ()=>{
//   return (
//     <div className="board">
//       <div className="square"><button>1</button></div>
//       <div className="square"><button>2</button></div>
//       <div className="square"><button>3</button></div>
//       <div className="square"><button>4</button></div>
//       <div className="square"><button>5</button></div>
//       <div className="square"><button>6</button></div>
//       <div className="square"><button>7</button></div>
//       <div className="square"><button>8</button></div>
//       <div className="square"><button>9</button></div>
//     </div>
//   );
// };
// const Game = ({game}) =>{
//   return games[game] || games['ticTacToe'];
// };
const Board = ({numSquares})=>(
  <div className="board">
    <div className="square"><button>1</button></div>
    <div className="square"><button>2</button></div>
    <div className="square"><button>3</button></div>
    <div className="square"><button>4</button></div>
    <div className="square"><button>5</button></div>
    <div className="square"><button>6</button></div>
    <div className="square"><button>7</button></div>
    <div className="square"><button>8</button></div>
    <div className="square"><button>9</button></div>
  </div>
);
const Games = {
  'Tic Tac Toe': {

  },
  'Memory': {

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
const Display = ()=>{
  return (
    <div className="display">
      <h1>Next player: X</h1>
      <button>Controles</button>
    </div>);
};
const Game = ({game})=>(
  <div className="game">
    <div className="title">
      <h1>{game}</h1>
    </div>
    <Display />
    <div>Memory Board</div>
  </div>);
      
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
