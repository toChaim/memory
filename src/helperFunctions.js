import { isNull } from 'util';

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