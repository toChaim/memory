import React, {useState, useEffect, useReducer} from 'react';
import { useComponentSize } from '../helperFunctions';
import Line from '../Line';
import Board from '../Board';

const Square = ({ idx, content, condition, handleClick }) => (
  <button
    id={`sqr${idx}`}
    className="square "
    onClick={handleClick}
    style={{
      position: 'relative',
      fontSize: '24px',
      fontWeight: 'bold',
      borderRadius: '5px',
      border: `5px solid ${condition? 'lightgreen':'pink'}`,
      background: 'transparent',
    }}
  >
    {content}
  </button>
);

const getMessage = (players, turn) => {
  if (players[turn]) { return `Player ${players[turn]}'s turn.`; }
  if (players[turn - players.length]) { return `${players[turn - players.length]} wins!!!`; }
  return 'Tie Game';
};

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

const Game = () => {
  // const handleReset = () => {
  //   setValues(new Array(9).fill('').map((cur) => ({ content: '', condition: '' })));
  //   setTurn(0);
  //   setWins([]);
  // };

  const init = () => {
    return { 
      turn: 0,
      values: new Array(9).fill('').map((cur) => ({ content: '', condition: '' })),
      wins: [],
    };
  };


  // const [values, setValues] = useState(new Array(9).fill('').map((cur) => ({ content: '', condition: '' })));
  const players = ['X', 'O'];
  // const [turn, setTurn] = useState(0);
  // const [wins, setWins] = useState([]);
  const [dimensions, ref] = useComponentSize();

  const reducer = (state, action) => {
    switch (action.type){
    case 'move':
      console.log('action', action);
      const i = action.idx;
      if (state.values[i].content || state.turn >= players.length) { return state; }

      const newValues = state.values.map((cur, idx) => (i === idx ? { ...cur, content: players[state.turn] } : { ...cur }));
      const newWins = state.wins.map(cur => { return { ...cur }; });
      let newTurn = (state.turn + 1) % players.length;

      for (let i = 0; i < 3; i++) {
        if (players[state.turn] === newValues[i * 3].content && players[state.turn] === newValues[i * 3 + 1].content && players[state.turn] === newValues[i * 3 + 2].content) {
          newTurn = players.length + state.turn;
          newWins.push({ key: 'row', x1: 1 / 9, y1: 1 / 6 + i / 3, x2: 8 / 9, y2: 1 / 6 + i / 3 });
          newValues[i * 3].condition = newValues[i * 3 + 1].condition = newValues[i * 3 + 2].condition = 'win';
        }
        if (players[state.turn] === newValues[i].content && players[state.turn] === newValues[i + 3].content && players[state.turn] === newValues[i + 6].content) {
          newTurn = players.length + state.turn;
          newWins.push({ key: 'cols', x1: 1 / 6 + i / 3, y1: 1 / 9, x2: 1 / 6 + i / 3, y2: 8 / 9 });
          newValues[i].condition = newValues[i + 3].condition = newValues[i + 6].condition = 'win';
        }
      }
      if (players[state.turn] === newValues[0].content && players[state.turn] === newValues[4].content && players[state.turn] === newValues[8].content) {
        newTurn = players.length + state.turn;
        newWins.push({ key: 'slash', x1: 1 / 9, y1: 1 / 9, x2: 8 / 9, y2: 8 / 9 });
        newValues[0].condition = newValues[4].condition = newValues[8].condition = 'win';
      }
      if (players[state.turn] === newValues[2].content && players[state.turn] === newValues[4].content && players[state.turn] === newValues[6].content) {
        newTurn = players.length + state.turn;
        newWins.push({ key: 'backslash', x1: 8 / 9, y1: 1 / 9, x2: 1 / 9, y2: 8 / 9 });
        newValues[2].condition = newValues[4].condition = newValues[6].condition = 'win';
      }
      if (newValues.filter((cur) => cur.content).length === 9 && state.turn < players.length) {
        newTurn = players.length * 2;
      }

      // setWins(newWins);
      // setValues(newValues);
      // setTurn(newTurn);
      return {wins: newWins, values: newValues, turn: newTurn};
    case 'reset':
      console.log('reset', action);
      return init();
    case 'default':
      console.log('default', action);
      return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, init());

  const handleKeyPress = (event) => {
    const row = 3;
    const col = 3;

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

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // const move = (i) => {
  //   if (values[i].content || turn >= players.length) { return; }
  //   const newValues = values.map((cur, idx) => (i === idx ? { ...cur, content: players[turn] } : { ...cur }));
  //   const newWins = wins.map(cur => {return {...cur}; });
  //   let newTurn = (turn + 1) % players.length;
    
  //   for (let i = 0; i < 3; i++) {
  //     if (players[turn] === newValues[i * 3].content && players[turn] === newValues[i * 3 + 1].content && players[turn] === newValues[i * 3 + 2].content) {
  //       newTurn = players.length + turn;
  //       newWins.push( { key: 'row', x1: 1 / 9, y1: 1/6 + i/3, x2: 8/9, y2: 1/6 + i/3 } );
  //       newValues[i*3].condition = newValues[i*3 + 1].condition = newValues[i*3 + 2].condition = 'win';
  //     }
  //     if (players[turn] === newValues[i].content && players[turn] === newValues[i + 3].content && players[turn] === newValues[i + 6].content) {
  //       newTurn = players.length + turn;
  //       newWins.push( { key: 'cols', x1: 1/6 + i/3, y1: 1 / 9, x2: 1/6 + i/3, y2: 8/9 } );
  //       newValues[i].condition = newValues[i + 3].condition = newValues[i + 6].condition = 'win';
  //     }
  //   }
  //   if (players[turn] === newValues[0].content && players[turn] === newValues[4].content && players[turn] === newValues[8].content) {
  //     newTurn = players.length + turn;
  //     newWins.push({ key: 'slash', x1: 1 / 9, y1: 1 / 9, x2: 8/9, y2: 8/9 } );
  //     newValues[0].condition = newValues[4].condition = newValues[8].condition = 'win';
  //   }
  //   if (players[turn] === newValues[2].content && players[turn] === newValues[4].content && players[turn] === newValues[6].content) {
  //     newTurn = players.length + turn;
  //     newWins.push({ key: 'backslash', x1: 8/9, y1: 1/9, x2: 1/9, y2: 8/9 } );
  //     newValues[2].condition = newValues[4].condition = newValues[6].condition = 'win';
  //   }
  //   if (newValues.filter((cur) => cur.content).length === 9 && turn < players.length) {
  //     newTurn = players.length * 2;
  //   }

  //   setWins(newWins);
  //   setValues(newValues);
  //   setTurn(newTurn);
  // };


  console.log(state);

  // const extras = state.wins.map(cur => {
  //   let width = dimensions.width - 20;
  //   let height = dimensions.height -20;

  //   return (<Line 
  //     key={cur.key}
  //     x1={ width * cur.x1 + 5}
  //     y1={ height * cur.y1 + 5}
  //     x2={ width * cur.x2 + 5} 
  //     y2={ height * cur.y2 + 5} 
  //     color={'lightgreen'} />);
  // });
  const extras = [];

  const squares = state.values.map((cur, idx) => (
    <Square
      idx={idx}
      content={cur.content}
      condition={cur.condition}
      key={idx}
      handleClick={() => dispatch({type: 'move', idx: idx})}
    />
  ));

  return (
    <div
      className="game"
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 8fr',
        border: 'none',
      }}
    >
      <GameInfo message={getMessage(players, state.turn)} handleReset={()=>dispatch({type:'reset'})} />
      <Board squares={squares} extras={extras} boardRef={ref}/>
    </div>
  );
};

export default Game;