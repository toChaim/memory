import React, {useState, useEffect} from 'react';

// const Dot = ({dimensions}) => {
//   return (<div className="dot" style={{
//     position: 'absolute',
//     width: '100%',
//     top: (dimensions.top || 10) + (dimensions.height || 50)/2 - 10 + 'px',
//     left: (dimensions.left || 10) + (dimensions.width || 50)/2 - 10 + 'px',
//     height: '5px',
//     backgroundColor: 'red',
//     borderRadius: '20px',
//   }}></div>);};

const Square = ({idx, value, handleClick}) => {
  const myRef = React.createRef();

  return (<button 
    ref={myRef}
    id={`sqr${idx}`}
    className="square"
    // onClick={() => handleClick(idx, myRef.current ? myRef.current.getBoundingClientRect() : '')}
    onClick={() => handleClick(idx)}
    style={{
      'width': '100%',
      'height': '100%',
      'fontSize': '24px',
      'fontWeight': 'bold',
      borderRadius: '5px'
    }}
  >
    {value}
  </button>
  );
};

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

  // const WinRow = ()=>(<div
  //   className="winrow"
  //   style={{
  //     border: '5px solid black',
  //     position: 'absolute',
  //     width: '80%',
  //     right: '5%',
  //     top: '54.5%',
  //     transformOrigin: 'center',
  //     transform: 'rotate(40deg)'
  //   }}></div>);

  return (<div className="board"
    onKeyDown={handleKeyPress}
    style={{ 
      'display': 'grid', 
      'gridTemplate': `repeat(${row}, 1fr) / repeat(${col}, 1fr)`,
      gridGap: '5px',
      padding: '5px',
      // border: '5px solid pink',
      borderRadius: '5px',
      backgroundColor: 'hotpink'
    }}>{squares}
    {/* <WinRow /> */}
  </div>);};

const Game = () => {
  const [values,setValues] = useState(new Array(9).fill(''));
  // const [dots, setDots] = useState(new Array(9).fill(''));
  const players = ['X','O'];
  const [turn, setTurn] = useState(0);
  const [message, setMessage] = useState('Player X\'s turn.');

  // const move = (i,dot) => {
  const move = (i) => {
    if(values[i] || message !== `Player ${players[turn]}'s turn.`){ return; }
    setValues(values.map((cur,idx)=>i===idx?players[turn]:cur));
    // setDots(dots.map((cur, idx) => i === idx ? dot : cur));
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
      idx={idx}
      value={cur} 
      key={idx} 
      handleClick={move}
    />)
  );
  
  // const dotComponants = dots.filter(cur => cur).map((cur, idx) => (<Dot dimensions={cur} key={idx}/>));

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
      {/* {dotComponants} */}
    </div>
  );
};

export default Game;