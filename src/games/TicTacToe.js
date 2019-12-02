import React, { useState } from 'react';
import {useComponentSize} from '../helperFunctions';

const Line = ({ x1, y1, x2, y2, stroke = 10, color = 'red' }) => {
  let width = ((y2 - y1) ** 2 + (x2 - x1) ** 2) ** 0.5;
  let left = (x1 + x2 - width - stroke) / 2;
  console.log(width, left, (x1 + x2) / 2);

  return (<div
    className="line"
    style={{
      position: 'absolute',
      border: `${stroke / 2}px solid ${color}`,
      borderRadius: stroke + 'px',
      transform: `rotate(${Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI}deg)`,
      top: (y1 + y2 - stroke) / 2 + 'px',
      left: left + 'px',
      width: width + 'px',
      // opacity: 0.5
    }} />);
};

const Square = ({
  idx, content, condition, handleClick,
}) => (
  <button
    id={`sqr${idx}`}
    className="square "
    onClick={handleClick}
    style={{
      position: 'relative',
      fontSize: '24px',
      fontWeight: 'bold',
      borderRadius: '5px',
      border: '5px solid pink',
      background: 'transparent',
    }}
  >
    {content}
  </button>
);

const GameInfo = ({ message, handleReset }) => (
  <div
    className="game-info"
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      fontSize: '24px',
      fontWeight: 'bold',
      border: 'none',
      margin: 'auto',
      width: '100%',
    }}
  >
    <div
      style={{
        gridColumnStart: '2',
      }}
    >
      {message}

    </div>
    <div style={{
      display: 'grid',
      alignItems: 'center',
      justifyContent: 'end',
    }}
    >
      <button onClick={handleReset}>Reset</button>

    </div>
  </div>
);

const Board = ({ row = 3, col = 3, squares, extras } = { row: 3, col: 3}) => {
  const [dimensions, ref] = useComponentSize();
  extras = [(<div key={'winrow'} id={'winrow'} className="winbar" style={{
    left: 0,
    top: 0,
    width: '1px',
    height: '1px',
    background: 'lightgreen',
    position: 'absolute',
    border: '5px solid blue'
  }}>
  </div>),
  (<div key={'wincol'} id={'wincol'} className="winbar" style={{
    left: dimensions.width - 20 + 'px',
    top: dimensions.height - 20 + 'px',
    width: '1px',
    height: '1px',
    background: 'lightgreen',
    position: 'absolute',
    border: '5px solid blue'
  }}>
  </div>)];

  // extras = [
  //   {id:'winrow', x1: 0, y1: 0},
  //   {id:'wincol', x1: dimensions.width - dimensions.x, y1:dimensions.height - dimensions.y}];
  // console.log(dimensions,extras);
  // extras = extras.map(cur => (<WinBar id={cur.id} x1={cur.x1} y1={cur.y1} />));

  const handleKeyPress = (event) => {
    if (document.activeElement.id.substr(0, 3) === 'sqr') {
      const oldIdx = Number(document.activeElement.id.substr(3));
      const { keyCode } = event;
      if (keyCode === 37) {
        document.getElementById(`sqr${oldIdx - oldIdx % row + (row + oldIdx - 1) % row}`).focus();
      } else if (keyCode === 38) {
        document.getElementById(`sqr${(row * col + oldIdx - row) % (row * col)}`).focus();
      } else if (keyCode === 39) {
        document.getElementById(`sqr${oldIdx - oldIdx % row + (oldIdx + 1) % row}`).focus();
      } else if (keyCode === 40) {
        document.getElementById(`sqr${(oldIdx + row) % (row * col)}`).focus();
      } else if (keyCode === 32) {
        document.activeElement.click();
      }
    }
  };

  return (
    <div
      ref={ref}
      className="board"
      onKeyDown={handleKeyPress}
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
};

const Game = () => {
  const [values, setValues] = useState(new Array(9).fill('').map((cur) => ({ content: '', condition: '' })));
  const players = ['X', 'O'];
  const [turn, setTurn] = useState(0);
  const [winType, setWinType] = useState([]);
  const [boardDimensions, setBoardDimensions] = useState(null);

  const move = (i) => {
    if (values[i].content || turn >= players.length) { return; }
    const newValues = values.map((cur, idx) => (i === idx ? { ...cur, content: players[turn] } : { ...cur }));
    let newTurn = (turn + 1) % players.length;
    for (let i = 0; i < 3; i++) {
      if (players[turn] === newValues[i * 3].content && players[turn] === newValues[i * 3 + 1].content && players[turn] === newValues[i * 3 + 2].content) {
        newTurn = players.length + turn;
        
      }
      if (players[turn] === newValues[i].content && players[turn] === newValues[i + 3].content && players[turn] === newValues[i + 6].content) {
        newTurn = players.length + turn;
        newValues[i].condition += '|';
        newValues[i + 3].condition += '|';
        newValues[i + 6].condition += '|';
      }
    }
    if (players[turn] === newValues[0].content && players[turn] === newValues[4].content && players[turn] === newValues[8].content) {
      newTurn = players.length + turn;
      newValues[0].condition += '/';
      newValues[4].condition += '/';
      newValues[8].condition += '/';
    }
    if (players[turn] === newValues[2].content && players[turn] === newValues[4].content && players[turn] === newValues[6].content) {
      newTurn = players.length + turn;
      newValues[2].condition += '\\';
      newValues[4].condition += '\\';
      newValues[6].condition += '\\';
    }
    if (newValues.filter((cur) => cur.content).length === 9 && turn < players.length) {
      newTurn = players.length * 2;
    }

    setValues(newValues);
    setTurn(newTurn);
  };

  const squares = values.map((cur, idx) => (
    <Square
      idx={idx}
      content={cur.content}
      condition={cur.condition}
      key={idx}
      handleClick={() => move(idx)}
    />
  ));

  const handleReset = () => {
    setValues(new Array(9).fill('').map((cur) => ({ content: '', condition: '' })));
    setTurn(0);
  };

  const getMessage = () => {
    if (players[turn]) { return `Player ${players[turn]}'s turn.`; }
    if (players[turn - players.length]) { return `${players[turn - players.length]} wins!!!`; }
    return 'Tie Game';
  };

  return (
    <div
      className="game"
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 8fr',
        border: 'none',
      }}
    >
      <GameInfo message={getMessage(values, turn)} handleReset={handleReset} />
      <Board squares={squares} extras={winType}/>
    </div>
  );
};

export default Game;