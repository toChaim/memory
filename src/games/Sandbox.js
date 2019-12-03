import React from 'react';
import { useComponentSize } from '../helperFunctions';
import Line from '../Line';
import Board from '../Board';

const Square = ({idx}) => (<button className='square' style={{ background: 'transparent', position: 'relative' }}>{idx}</button>);

// Usage
function GetSize() {
  const [boardSize, boardRef] = useComponentSize();
  const squares = new Array(9).fill(1).map((cur,idx) => (<Square idx={idx} key={idx} />));
  const extras = [<Line key={1} x1={0} y1={0} x2={(boardSize.width || 10) - 10} y2={(boardSize.height || 10) - 10} />];

  return (
    <div
      className="game"
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 8fr',
        border: 'none',
      }}
    >
      <div className="game-info"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          fontSize: '24px',
          fontWeight: 'bold',
          border: 'none',
          margin: 'auto',
          width: '100%',
        }}>{boardSize.width}px / {boardSize.height}px</div>
      <Board boardRef={boardRef} squares={squares} extras={extras}/>
    </div>
  );
}

export default GetSize;