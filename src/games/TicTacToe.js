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

const Point = ({x,y}) => (<div className="point" style={{
  'position': 'absolute',
  'top': `${x}px`,
  'left': `${y}px`,
  'width': '1px',
  'height': '1px',
  'backgroundColor': 'red',
  'borderRadius': '100%'
}} ></div>);

const Line = ({x1,y1,x2,y2}) => {
  // must handle 0
  let rise = y2-y1;
  let run = x2-x1;

  return [
    (<Point x={x1} y={y1} />),
    (<Point x={x2} y={y2} />), 
    (<div className="line" key="0" style={{
      'position': 'absolute',
      'border': '0.5px solid black',
      'transformOrigin': `${y1}px ${x1}px`,
      'transform': `rotate(${90-Math.atan(rise/run)*180/Math.PI}deg)`,
      'top': y1 + 'px',
      'left': x1 + 'px',
      'width': `${Math.pow((rise*rise+run*run),0.5)}px`
    }}></div>)];
};

const Flash = () => {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  return (
    visibility && <div className={`alert alert-${type}`}>
      <p>{message}</p>
      <button className="close" onClick={()=> setVisibility(false)}>X</button>
    </div>
  );
};

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
  // const [dots, setDots] = useState(new Array(9).fill(''));
  const players = ['X','O'];
  const [turn, setTurn] = useState(0);
  // const [message, setMessage] = useState('Player X\'s turn.');

  // const move = (i,dot) => {
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
    // setValues([...newValues.slice(0,9),(<Line x1={50} y1={50} x2={200} y2={200}/>)]);

    // setDots(dots.map((cur, idx) => i === idx ? dot : cur));
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

  // useEffect(()=>{
  //   let message = '';
  //   let justMoved = players[Number(!turn)];

  //   for (let i = 0; i < 3; i++){
  //     if (justMoved === values[i * 3] && justMoved === values[i * 3 + 1] && justMoved === values[i*3+2] ){
  //       message = `${justMoved} Wins!!!`;
  //     }
  //     else if (justMoved === values[i] && justMoved === values[i + 3] && justMoved === values[i + 6]) {
  //       message = `${justMoved} Wins!!!`;
  //     }
  //   }
  //   if (justMoved === values[0] && justMoved === values[4] && justMoved === values[8]) {
  //     message = `${justMoved} Wins!!!`;
  //   } 
  //   if (justMoved === values[2] && justMoved === values[4] && justMoved === values[6]) {
  //     message = `${justMoved} Wins!!!`;
  //   }
  //   if(values.filter(v => v).length === 9 && !message){
  //     message = 'Tie Game.';
  //   }
  //   // setValues([...values.slice(0,9),(<Line x1={50} y1={50} x2={200} y2={200}/>)]);
  //   setMessage(message || `Player ${players[turn]}'s turn.`);
  // },[values, players, turn]);

  // const dotComponants = dots.filter(cur => cur).map((cur, idx) => (<Dot dimensions={cur} key={idx}/>));

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
      {/* {dotComponants} */}
    </div>
  );
};

export default Game;