import React, {useState, useEffect} from 'react';

const Square = ({ idx, content, condition, handleClick}) => {
  // const myRef = React.createRef();
  let background = 'white';
  if (condition.includes('-')) { background = 'linear-gradient(transparent 34%, lightgreen 34%, lightgreen 66%, transparent 66%), ' + background; }
  if (condition.includes('|')) { background = 'linear-gradient(90deg, transparent 40%, lightgreen 40%, lightgreen 58%, transparent 58%), ' + background; }
  if (condition.includes('/')) { background = 'linear-gradient(30deg, transparent 39%, lightgreen 34%, lightgreen 56%, transparent 56%), ' + background; }
  if (condition.includes('\\')) { background = 'linear-gradient(160deg, transparent 39%, lightgreen 34%, lightgreen 56%, transparent 56%), ' + background; }
 
  const style = {
    'fontSize': '24px',
    'fontWeight': 'bold',
    'borderRadius': '5px',
    "background": background,
  };

  return (<button 
    // ref={myRef}
    id={`sqr${idx}`}
    className={'square '}
    onClick={handleClick}
    // onClick={() => handleClick(idx, myRef.current ? myRef.current.getBoundingClientRect() : '')}
    onClick={() => handleClick(idx)}
    style={style}
  >
    {content}
  </button>
  );
};

const GameInfo = ({ message, handleReset}) => (
  <div 
    className="game-info"
    style={{
      'display': 'grid',
      'gridTemplateColumns': '1fr 1fr 1fr',
      'fontSize': '24px',
      'fontWeight': 'bold',
      'border': 'none',
      'margin': 'auto',
      'width': '100%'
    }}
  >
    <div
      style={{
        'gridColumnStart': '2'
      }}
    >{message}</div>
    <div style={{
      'display': 'grid',
      'alignItems': 'center',
      'justifyContent': 'end',
    }}><button onClick={handleReset}>Reset</button></div>
  </div>
);

const Board = ({ row=3, col=3, squares } = { row: 3, col: 3, squares: [] }) => {
  const handleKeyPress = event => {
    if(document.activeElement.id.substr(0,3) === 'sqr'){
      const oldIdx = Number(document.activeElement.id.substr(3));
      const keyCode = event.keyCode;
      if(keyCode === 37){
        document.getElementById(`sqr${oldIdx - oldIdx % row + (row + oldIdx - 1) % row}`).focus();
      }
      else if (keyCode === 38) {
        document.getElementById(`sqr${(row*col+oldIdx-row)%(row*col)}`).focus();
      }
      else if (keyCode === 39) {
        document.getElementById(`sqr${oldIdx - oldIdx % row + (oldIdx + 1) % row}`).focus();
      }
      else if (keyCode === 40) {
        document.getElementById(`sqr${(oldIdx + row) % (row * col)}`).focus();
      }
      else if(keyCode === 32) {
        document.activeElement.click();
      }
      
    }
  };

  return (<div className="board"
    onKeyDown={handleKeyPress}
    style={{ 
      'position': 'relative',
      'display': 'grid', 
      'gridTemplate': `repeat(${row}, 1fr) / repeat(${col}, 1fr)`,
      gridGap: '5px',
      padding: '5px',
      // border: '5px solid pink',
      borderRadius: '5px',
      backgroundColor: 'hotpink'
    }}>
    {squares}
  </div>);};

const Game = () => {
  const [values, setValues] = useState(new Array(9).fill('').map(cur => { return { "content": '', 'condition': ''}; }));
  const players = ['X','O'];
  const [turn, setTurn] = useState(0);

  const move = (i) => {
    if(values[i].content || turn >= players.length){ return; }
    let newValues = values.map((cur,idx)=>i===idx?{...cur,'content': players[turn]}:{...cur});
    let newTurn = (turn + 1) % players.length;
    for (let i = 0; i < 3; i++) {
      if (players[turn] === newValues[i * 3].content && players[turn] === newValues[i * 3 + 1].content && players[turn] === newValues[i * 3 + 2].content) {
        newTurn = players.length + turn;
        newValues[i * 3].condition += '-';
        newValues[i * 3 + 1].condition += '-';
        newValues[i * 3 + 2].condition += '-';
      }
      if (players[turn] === newValues[i].content && players[turn] === newValues[i + 3].content && players[turn] === newValues[i + 6].content) {
        newTurn = players.length + turn;
        newValues[i].condition += "|";
        newValues[i + 3].condition += "|"
        newValues[i + 6].condition += "|";
      }
    }
    if (players[turn] === newValues[0].content && players[turn] === newValues[4].content && players[turn] === newValues[8].content) {
      newTurn = players.length + turn;
      newValues[0].condition += '/'
      newValues[4].condition += '/'
      newValues[8].condition += '/'
    }
    if (players[turn] === newValues[2].content && players[turn] === newValues[4].content && players[turn] === newValues[6].content) {
      newTurn = players.length + turn;
      newValues[2].condition += '\\'
      newValues[4].condition += '\\'
      newValues[6].condition += '\\'
    }
    if (newValues.filter(cur => cur.content).length === 9 && turn < players.length) {
      newTurn  = players.length * 2;
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
    />));

  const handleReset = ()=> {
    setValues(new Array(9).fill('').map(cur => { return { "content": '', 'condition': '' }; }));
    setTurn(0);
  };

  const getMessage = () => {
    if(players[turn]){ return `Player ${players[turn]}'s turn.`; }
    if (players[turn - players.length]) { return `${players[turn - players.length]} wins!!!`; }
    return 'Tie Game';
  };

  return (
    <div className="game" style={{
      'display': 'grid',
      'gridTemplateRows': '1fr 8fr',
      'border': 'none'
    }}>
      <GameInfo message={getMessage(values, turn)} handleReset={handleReset}/>
      <Board squares={squares}/>
    </div>
  );
};

export default Game;