import React from 'react';

const NavBar = ({Games, handleClick, game})=>{
  let gamesList = Object.keys(Games).map( g => (<li key={g}>
    <button 
      className={game===g?'selected':''} 
      onClick={() => handleClick(g)} 
      style={{
        width: '100%',
        borderRadius: '5px',
        border: game === g ? '5px solid hotpink' : '',
      }}>
      {g}
    </button>
  </li>));
  return (<nav style={{
    border: '5px solid pink',
    borderRadius: '5px',
    gridRow: '1 / -1',
  }}>
    <ul
      style={{
        listStyleType: 'none',
        padding: '0'
      }}>
      Games
      {gamesList}
    </ul>
  </nav>);
};

export default NavBar;