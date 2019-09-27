import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const NavBar = ({chooseGame, game})=>(<nav>
  <ul>
    <a href="#">Home</a>
    <li><button className={} onClick={()=>chooseGame('ticTacToe')}>Tic Tack Toe</button></li>
    <li><button onClick={()=>chooseGame('memory')}>Memory</button></li>
  </ul>
</nav>);
const Display = ()=>{
  return (
    <div className="display">
      <h1>Next player: X</h1>
      <button>Controles</button>
    </div>);
};
const Board = ()=>{
  return (
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
};
const Game = ({game}) =>{
  let games = { 
    'ticTacToe': (
      <div className="game">
        <div className="title">
          <h1>Tic Tac Toe</h1>
        </div>
        <Display />
        <Board />
      </div>),
    'memory': (
      <div className="game">
        <div className="title">
          <h1>Memory</h1>
        </div>
        <Display />
        <div>Memory Board</div>
      </div>)
  };
  return games[game] || games['ticTacToe'];
};

const App = () => {
  const [game, setGame] = useState(
    'memory'
  );

  return (<div className="container">
    <NavBar game={game} chooseGame={setGame}/>
    <Game game={game} />
  </div>);
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
