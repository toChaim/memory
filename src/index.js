import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import NavBar from './components/NavBar';
import TicTacToe from './games/TicTacToe';
// import Memory from './components/Memory'; 

// Data
const Games = {
  'Tic Tac Toe': <TicTacToe />,
  // 'Memory': <Memory />,
  // 'Math Memory': <MathMemory />
};

const App = () => {
  const [game, setGame] = useState('Tic Tac Toe');
  
  return (<div className="container"
    style={{
      background: 'white',
      display: 'grid',
      gridTemplateColumns: 'minmax(50px, 1fr) 9fr',
      gridGap: '5px',
      padding: '5px',
      height: '98vh'
    }}>
    <NavBar Games={Games} game={game} handleClick={setGame}/>
    {Games[game]}
  </div>);
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
