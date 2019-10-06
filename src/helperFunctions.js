export default function randomizeArray(arr){
  let res =  arr.map(v=>v);
  res.forEach((v,i,a)=>{
    let swap = Math.floor(Math.random() * (a.length - i)) + i;
    [a[i], a[swap]] = [a[swap], a[i]];
  });
  return res;
}