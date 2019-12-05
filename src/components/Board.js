import React from 'react';

const Board = ({ row = 3, col = 3, squares, extras, boardRef } = { row: 3, col: 3 }) => (<div
  ref={boardRef}
  className="board"
  style={{
    position: 'relative',
    display: 'grid',
    gridTemplate: `repeat(${row}, 1fr) / repeat(${col}, 1fr)`,
    gridGap: '5px',
    padding: '5px',
    border: '5px solid pink',
    borderRadius: '5px',
    backgroundColor: 'white',
  }}
>
  {extras}
  {squares}
</div>
);

export default Board;