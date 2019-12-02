import { useLayoutEffect, useState, createRef } from 'react';

// from https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
// and https://stackoverflow.com/questions/19014250/rerender-view-on-browser-resize-with-react
const useComponentSize = () => {
  const [size, setSize] = useState({});
  const [ref, setRef] = useState(createRef());

  useLayoutEffect(() => {
    const handleResize = () => {
      if (ref.current) { setSize(ref.current.getBoundingClientRect()); }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [ref]);

  return [size, ref];
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

export { useComponentSize, randomizeArray, deepCopy};