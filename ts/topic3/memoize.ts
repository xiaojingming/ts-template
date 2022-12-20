/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
interface F {
  (...res: any[]): any,
}
interface O {
  [K: string]: any,
}

function add(a: number, b: number) {
  return a + b;
}
function add2(a: number, b: number, c: number) {
  return a + b + c;
}
function memoize(f: F, hash?: F) {
  const cache: O = {};
  return function fn(...params: any[]) {
    const key = hash ? hash.apply(this, params) : params[0];
    if (!(key in cache)) {
      cache[key] = f.apply(this, params);
    }
    return cache[key];
  };
}

// const memoizeAdd = memoize(add);
// const time = 100000;

// console.time('doesnot use memoize');
// for (let i = 0; i < time; i += 1) {
//   add(5, 10);
// }
// console.timeEnd('doesnot use memoize');

// console.time('use memoize');
// for (let j = 0; j < time; j += 1) {
//   memoizeAdd(5, 10);
// }
// console.timeEnd('use memoize');

function getValue(target: { value: number }) {
  return target.value;
}
// const memoizeValue = memoize(getValue);
// console.log(memoizeValue({ value: 1 }));
// console.log(memoizeValue({ value: 2 }));
// const memoizeAdd2 = memoize(add2, (...arg) => JSON.stringify(arg));
// const memoizeAdd2 = memoize(add2, JSON.stringify);
// console.log(memoizeAdd2(1, 2, 3));
// console.log(memoizeAdd2(1, 2, 4));
console.log('%c---------------->', 'color: red;');

let count = 0;
let count2 = 0;
function fib(n: number): number {
  count += 1;
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
}
let fib2 = (n: number): number => {
  count2 += 1;
  return n < 2 ? n : fib2(n - 1) + fib2(n - 2);
};
for (let i = 0; i <= 10; i += 1) {
  fib(i);
}

console.log(count); // 453

fib2 = memoize(fib2, JSON.stringify);
for (let i = 0; i <= 10; i += 1) {
  fib2(i);
}
console.log(count2);

export {};
