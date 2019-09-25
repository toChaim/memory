import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const NavBar = ()=>(<nav>
  <ul><a href="#">Home</a><li><a href="#">Tic Tack Toe</a></li></ul>
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
const Game = ()=>{
  return (
    <div className="game">
      <div className="title">
        <h1>Tic Tac Toe</h1>
      </div>
      <Display />
      <Board />
    </div>);
};

const App = () => (<div className="container">
  <NavBar />
  <Game />
</div>);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
