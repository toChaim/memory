import React from 'react';

export default ({row, col, squares} = {row:3, col:3, squares:[]})=>{
  document.documentElement.style.setProperty('--row', row);
  document.documentElement.style.setProperty('--col', col);

  return (<div className="board">{squares}</div>);
};