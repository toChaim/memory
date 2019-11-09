import {deepCopy, randomizeArray} from '../helperFunctions';

describe('deepCopy', ()=>{
  it('is a function', ()=>{
    expect(typeof(deepCopy)).toBe('function');
  });
  it('to return a new array', ()=>{
    let arr = Object.freeze([1,2,3,4]);
    let res = deepCopy(arr);

    expect(res).not.toBe(arr);
    expect(Array.isArray(res)).toBe(true);
  });
  it('should contain same values',()=>{
    let arr = Object.freeze(new Array(100).fill(1).map((v,i)=>i));
    expect(deepCopy(arr)).toEqual(arr);
  });
  it('should copy objects', ()=>{
    let obj = { a: 56, b: 'swirl', c:true, d:null, e:0, f:undefined };
    let res = deepCopy(obj);

    expect(res).not.toBe(obj);
    expect(res).toEqual(obj);
  });
  it('should copy compound objects', ()=>{
    let obj = [{ a: 56, b: 'swirl', c:true, d:null, e:0, f:undefined },[],{},null,0,false,undefined, {a:{},'':''}];
    let res = deepCopy(obj);

    expect(res).not.toBe(obj);
    expect(res).toEqual(obj);
  });
});

describe('randomizeArray', ()=>{
  it('is a function', ()=>{
    expect(typeof(randomizeArray)).toBe('function');
  });
  it('should return empty for empty',()=>{
    expect(randomizeArray([])).toEqual([]);
    expect(JSON.stringify(randomizeArray([]))).toBe(JSON.stringify([]));
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