import React, {useState, useEffect} from 'react';

const Square = ({value, handleClick}) => (
  <button 
    className="square" 
    onClick={handleClick}
    style={{
      'width': '100%',
      'height': '100%',
      'fontSize': '24px',
      'fontWeight': 'bold'
    }}
  >
    {value}
  </button>
);

const GameInfo = ({ message, handleReset}) => (
  <div 
    className="game-info"
    style={{
      'display': 'grid',
      'gridTemplateColumns': '2fr 1fr',
      'fontSize': '24px',
      'fontWeight': 'bold',
      'border': 'none',
      'margin': 'auto'
    }}
  >
    <div>{message}</div>
    <div style={{
      'display': 'flex',
      'alignItems': 'center',
      'justifyContent': 'center',
    }}><button onClick={handleReset}>Reset</button></div>
  </div>
);

const Board = ({ row=3, col=3, squares } = { row: 3, col: 3, squares: [] }) => (
  <div className="board" 
    style={{ 
      'display': 'grid', 
      'gridTemplate': `repeat(${row}, 1fr) / repeat(${col}, 1fr)`,
      border: '5px solid pink',
      borderRadius: '5px'
    }}>{squares}</div>
);

const Game = () => {
  const [values,setValues] = useState(new Array(9).fill(''));
  const players = ['X','O'];
  const [turn, setTurn] = useState(0);
  const [message, setMessage] = useState('Player X\'s turn.');

  const move = i => {
    if(values[i] || message !== `Player ${players[turn]}'s turn.`){ return; }
    setValues(values.map((cur,idx)=>i===idx?players[turn]:cur));
    setTurn(Number(!turn));
  };
  useEffect(()=>{
    let message = '';
    let justMoved = players[Number(!turn)];

    for (let i = 0; i < 3; i++){
      if (justMoved === values[i * 3] && justMoved === values[i * 3 + 1] && justMoved === values[i*3+2] ){
        message = `${justMoved} Wins!!!`;
      }
      else if (justMoved === values[i] && justMoved === values[i + 3] && justMoved === values[i + 6]) {
        message = `${justMoved} Wins!!!`;
      }
    }
    if (justMoved === values[0] && justMoved === values[4] && justMoved === values[8]) {
      message = `${justMoved} Wins!!!`;
    } 
    if (justMoved === values[2] && justMoved === values[4] && justMoved === values[6]) {
      message = `${justMoved} Wins!!!`;
    }
    if(values.filter(v => v).length === 9 && !message){
      message = 'Tie Game.';
    }
    setMessage(message || `Player ${players[turn]}'s turn.`);
  },[values, players, turn]);

  const squares = values.map((cur, idx) => (
    <Square 
      value={cur} 
      key={idx} 
      handleClick={
        () => { move(idx); }
      }
    />)
  );

  const handleReset = ()=> {
    setValues(new Array(9).fill(''));
    setTurn(0);
  };

  return (
    <div className="game" style={{
      'display': 'grid',
      'gridTemplateRows': '1fr 8fr',
      'border': 'none'
    }}>
      <GameInfo message={message} handleReset={handleReset}/>
      <Board squares={squares}/>
    </div>
  );
};

export default Game;