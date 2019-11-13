import React, {useState} from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import TicTacToe from './components/TicTacToe';
// import Memory from './components/Memory';
// import MathMemory from './components/MathMemory';

// Attoms
const Btn = ({handleClick, buttonText, className})=>(
  <button className={className + ' btn'} 
    onClick={() => handleClick(buttonText)}>
    {buttonText}
  </button>);

// Data
const Games = {
  'Tic Tac Toe': <TicTacToe />,
  // 'Memory': <Memory />,
  // 'Math Memory': <MathMemory />
};

const NavBar = ({Games, handleClick, game})=>{
  let gamesList = Object.keys(Games).map( g => (<li key={g}><Btn className={game===g? 'selected':'not'} handleClick={handleClick} buttonText={g} /></li>));
  return (<nav style={{
    border: '5px solid pink',
    borderRadius: '5px',
    gridRow: '1 / -1',
  }}>
    <ul>
      Games
      {gamesList}
    </ul>
  </nav>);
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
