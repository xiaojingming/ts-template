/* eslint-disable no-unused-vars */
// key = arguments.length + Array.prototype.join.call(arguments, ",");
interface F {
  (...params: any[]): any
}
interface O {
  [K: string]: any
}

function memoize(f: F, hasher?: F) {
  const obj: O = {};
  return function fn(...params: any[]) {
    const key = `${hasher ? hasher.apply(this, params) : params[0]}`;
    if (Reflect.has(obj, key)) {
      return obj[key];
    }
    obj[key] = f.apply(this, params);
    return obj[key];
  };
}

const add = (a: number, b: number, c: number) => a + b + c;
const memoizeAdd = memoize(add);
const num = 100000;
let i = 0;
let j = 0;

console.time('not memoize');
for (; i < num; i += 1) {
  add(1, 2, 3);
}
console.timeEnd('not memoize');
console.time('memoize');
for (; j < num; j += 1) {
  memoizeAdd(1, 2, 3);
}
console.timeEnd('memoize');
console.log('%c---------------->', 'color: red;');

const propValue = (target: { value: number }) => target.value;
const memoizePropValue = memoize(propValue, (...res: any[]) => JSON.stringify(res));

console.log(memoizePropValue({ value: 1 }));
console.log(memoizePropValue({ value: 2 }));
console.log('%c---------------->', 'color: red;');

let count = 0;
const fib = function fibonaci(n: number): number {
  count += 1;
  if (n < 2) {
    return n;
  }
  return fibonaci(n - 1) + fibonaci(n - 2);
};
for (let k = 0; k <= 10; k += 1) {
  fib(k);
}
console.log(count); // 453

let memoizeCount = 0;
let fib2 = function fibonaci(n: number): number {
  memoizeCount += 1;
  if (n < 2) {
    return n;
  }
  // eslint-disable-next-line no-debugger
  debugger;
  return fib2(n - 1) + fib2(n - 2);
};
let memoize2: any = function fn(f: F, hasher?: F) {
  memoize2 = function subFn(...params: any[]) {
    const { cache } = memoize2;
    const key = `${hasher ? hasher.apply(this, params) : params[0]}`;
    if (cache[key]) {
      return cache[key];
    }
    cache[key] = f.apply(this, params);
    return cache[key];
  };
  memoize2.cache = {};
  return memoize2;
};

fib2 = memoize2(fib2);
for (let l = 0; l <= 3; l += 1) {
  fib2(l);
}

console.log(memoizeCount);

export {};
