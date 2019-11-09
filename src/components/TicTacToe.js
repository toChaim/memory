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
      'grid-template': `repeat(${row}, 1fr) / repeat(${col}, 1fr)`,
      border: '5px solid pink'
    }}>{squares}</div>
);
// const Board = () => {
//   const move = i => 
//   const status = 'Next player: X';

//   return (
//     <div>
//       <div className="status">{status}</div>
//       <div className="board-row">
//         <Square index={0} handleClick={}/>
//         {renderSquare(1)}
//         {renderSquare(2)}
//       </div>
//       <div className="board-row">
//         {renderSquare(3)}
//         {renderSquare(4)}
//         {renderSquare(5)}
//       </div>
//       <div className="board-row">
//         {renderSquare(6)}
//         {renderSquare(7)}
//         {renderSquare(8)}
//       </div>
//     </div>
//   );
// };

class Game extends React.Component {
  render() {
    return (
      <div className="game" style={{
        'display': 'grid',
        'grid-template-rows': '1fr 1fr 8fr',
      }}>
        <div className="game-info">Player X's turn.</div>
        <Board row={3} col={3} squares={new Array(9).fill(1).map((cur,idx)=>(<Square index={idx} />))}/>
      </div>
    );
  }
}

export default Game;