import React from 'react';
import Board from './Board';

const MemorySquar = ({val, handleClick, selected})=>{
  return <div className={selected?'square selected':'square'}><button onClick={()=>handleClick(val)}>{selected?val:''}</button></div>;
};



export default ()=>{
  return (<div className="game">Memory</div>);
};