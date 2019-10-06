import randomizeArray from '../helperFunctions';

describe('randomizeArray', ()=>{
  it('is a function', ()=>{
    expect(typeof(randomizeArray)).toBe('function');
  });
  it('to return a new array', ()=>{
    let arr = Object.freeze([1,2,3,4]);
    expect(randomizeArray(arr)).not.toBe(arr);
  });
  it('should contain same values',()=>{
    let arr = Object.freeze(new Array(100).fill(1).map((v,i)=>i));
    expect(randomizeArray(arr)).not.toEqual(arr);
    expect(randomizeArray(arr).sort((a,b)=>a-b)).toEqual(arr);
  });
  it('should have even distribution', ()=>{
    let arr = Object.freeze(new Array(100).fill(1).map((v,i)=>i));
    let last = randomizeArray(arr);
    let values = new Array(100).fill(1).map(()=> new Array(100).fill(0));

    for(let i = 0; i < 100000; i++){
      let res = randomizeArray(arr);
      expect(res).not.toEqual(last);
      expect(arr).not.toEqual(res);
      expect(randomizeArray(arr).sort((a,b)=>a-b)).toEqual(arr);

      res.forEach((v,i)=>{
        values[i][v] += 1;
      });

      last = res;
    }

    for(let p of values){
      for(let v of p){
        expect(v).toBeGreaterThan(0);
        expect(v).toBeLessThan(2000);
      }
    }
  });
});