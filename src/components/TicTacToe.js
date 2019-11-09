import React, {useState} from 'react';

const Square = ({index, handleClick}) => (
  <button 
    className="square" 
    onClick={handleClick}
    style={{
      'width': '100%',
      'height': '100%',
    }}
  >
    {index}
  </button>
);

const Board = ({ row, col, squares } = { row: 3, col: 3, squares: [] }) => (
  <div className="board" 
    style={{ 
      'display': 'grid', 
      'gridTemplate': `repeat(${row}, 1fr) / repeat(${col}, 1fr)`,
      border: '5px solid pink'
    }}>{squares}</div>
);

const Game = () => (
  <div className="game" style={{
    'display': 'grid',
    'gridTemplateRows': '1fr 1fr 8fr',
  }}>
    <div className="game-info">Player X's turn.</div>
    <Board row={3} col={3} squares={new Array(9).fill(1).map((cur,idx)=>(<Square index={idx} key={idx}/>))}/>
  </div>
);

export default Game;