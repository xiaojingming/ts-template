/* eslint-disable no-unused-vars */
interface O {
  [key: string]: any;
}

function memoize(f: (...res: any) => any, hasher?: (...res: any[]) => any) {
  const cache: O = {};
  return function fn(...params: any[]) {
    // const key = `${params.length}${params.join(',')}`;
    const key = `${hasher ? hasher.apply(this, params) : params[0]}`;
    if (!(key in cache)) {
      cache[key] = f.apply(this, params);
    }
    return cache[key];
  };
}
const add = (a: number, b: number, c: number) => a + b + c;
const memoizeAdd = memoize(add);

// console.time('memoize');
// for (let i = 0; i < 100000; i += 1) {
//   memoizeAdd(1, 2, 3);
// }
// console.timeEnd('memoize');

// console.time('normal');
// for (let i = 0; i < 100000; i += 1) {
//   add(1, 2, 3);
// }
// console.timeEnd('normal');

const propValue = <T extends { value: number }>(obj: T) => obj.value;
const memoizePropValue = memoize(propValue, (...params: any[]) => JSON.stringify(params));
console.log(memoizePropValue({ value: 1 }));
console.log(memoizePropValue({ value: 2 }));

let count = 0;
function fibonacci(n: number): number {
  count += 1;
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
for (let i = 0; i <= 10; i += 1) {
  fibonacci(i);
}
console.log(count); // 453

let count2 = 0;
let fib = (n: number): number => {
  count2 += 1;
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
};
fib = memoize(fib, (res: any[]) => JSON.stringify(res));
for (let i = 0; i <= 10; i += 1) {
  fib(i);
}
console.log(count2);
export {};
