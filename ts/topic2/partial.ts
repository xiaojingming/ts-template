/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
interface F {
  (...res: any[]): any;
}

function partial(fn: F, ...params1: any[]) {
  return function f(...params2: any[]) {
    return fn.apply(this, params1.concat(params2));
  };
}
const _ = {};
const add = (a: number, b: number, c: number) => a + b + c;
const pAdd = partial(add, 1);
console.log(pAdd(2, 3)); // 6
console.log('%c---------------->', 'color: red;');

function vAdd(this: { value: number }, a: number, b: number) {
  return a + b + this.value;
}
const obj = {
  value: 1,
  add: partial(vAdd, 2),
};
console.log(obj.add(3)); // 6
console.log('%c---------------->', 'color: red;');

function partial2(fn: F, ...params1: any[]) {
  let index = 0;
  const arg: any[] = [];
  let i = 0;
  return function f(...params2: any) {
    for (; i < params1.length; i += 1) {
      const val = params1[i];
      arg.push(val === _ ? params2[index++] : val);
    }
    while (index < params2.length) {
      arg.push(params2[index++]);
    }
    return fn.apply(this, arg);
  };
}

const sum = (a: number, b : number, c: number, d: number) => d - c - b - a;
const pSum = partial2(sum, _, _, 30);
console.log(pSum(10, 20, 80)); // 20

export {};
