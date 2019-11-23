import React, { useLayoutEffect, useState, useRef } from 'react';

const useGetComponentSize = () => {
  const ref = useRef({});
  const [dimensions, setDimensions] = useState({ x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 });
  const updateSize = () => {
    if (ref.current) { setDimensions(ref.current.getBoundingClientRect()); }
    else { setDimensions({ x: 0, y: 0, width: window.innerWidth, height: window.innerHeight, top: 0, left: 0 }); }
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return [dimensions, ref];
};

function randomizeArray(arr){
  let res =  arr.map(v=>v);
  res.forEach((v,i,a)=>{
    let swap = Math.floor(Math.random() * (a.length - i)) + i;
    [a[i], a[swap]] = [a[swap], a[i]];
  });
  return res;
}

function deepCopy(obj){
  if(typeof(obj)!=='object' || obj === null){ return obj; }
  let res = Array.isArray(obj)? []:{};
  for(let k in obj){ res[k] = deepCopy(obj[k]); }
  return res;
}

export {randomizeArray, deepCopy};