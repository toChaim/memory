import React, {useState} from 'react';
import Board from './Board';

const Square = ({selected, handleClick, val, index}) => (
  <div className={selected?'square selected':'square'}>
    <button onClick={()=>handleClick(index)}>{val}</button>
  </div>);

export default ()=>{
  const [gameState, setGameState] = useState({
    peices: new Array(9).fill(''),
    state: 'Player X\'s turn.'
  });

  const handleClick = index => {
    if(gameState.peices[index]){
      const state = gameState.state;
      setGameState({state: 'BAD MOVE'});
      setTimeout(()=>{
        setGameState({state: state});
      },1000);
    }
    else{
      //handle game state
    }
  };
  return (<div className="game">Tic Tac Toe</div>);
};