import React, {useState} from 'react';

const Square = ({value, handleClick}) => (
  <button 
    className="square" 
    onClick={handleClick}
    style={{
      'width': '100%',
      'height': '100%',
    }}
  >
    {value}
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

const Game = () => {
  const [values,setValues] = useState(new Array(9).fill(''));
  const players = ['X','O'];
  const [turn, setTurn] = useState(0);
  const move = i => {
    if(values[i]){ return; }
    setValues(values.map((cur,idx)=>i===idx?players[turn]:cur));
    setTurn(Number(!turn));
  };

  const squares = values.map((cur, idx) => (
    <Square 
      value={cur} 
      key={idx} 
      handleClick={
        () => { move(idx); }
      }
    />)
  );

  return (
    <div className="game" style={{
      'display': 'grid',
      'gridTemplateRows': '1fr 1fr 8fr',
    }}>
      <div className="game-info">Player X's turn.</div>
      <Board row={3} col={3} squares={squares}/>
    </div>
  );
};

export default Game;