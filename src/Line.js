import React from 'react';

const Line = ({ x1, y1, x2, y2, stroke = 10, color = 'red' }) => {
  let width = ((y2 - y1) ** 2 + (x2 - x1) ** 2) ** 0.5;
  let left = (x1 + x2 - width - stroke) / 2;

  return (<div
    className="line"
    style={{
      position: 'absolute',
      border: `${stroke / 2}px solid ${color}`,
      borderRadius: stroke + 'px',
      transform: `rotate(${Math.atan((y2 - y1) / (x2 - x1)) * 180 / Math.PI}deg)`,
      top: (y1 + y2 - stroke) / 2 + 'px',
      left: left + 'px',
      width: width + 'px'
    }} />);
};

export default Line;