/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { data, Data, Item } from '../../data';

interface F {
  (...res: any): any;
}
interface O {
  [key: string]: any;
}
type FilterItem<T, U> = {
  [K in Exclude<keyof T, U>]: T[K];
};
type DataFilterItem = FilterItem<Item, 'complete' | 'username' | 'created'>
let upper = (str: string) => str.toUpperCase();
const hello = (str: string) => `HELLO ${str}`;
const sign = (str: string) => `${str} !!!!`;
// const greet = (str: string) => hello(upper(str));
const compose = (f: (str: string) => string, g: (str: string) => string) => (
  function fn(str: string) {
    return f(g(str));
  }
);
// const greet2 = compose(hello, upper);
// console.log(greet2('xiao')); // HELLO XIAO

function compose2(...fs: F[]) {
  return function fn(input: string) {
    return fs.reduceRight((prev, cur) => cur.call(this, prev), input);
  };
}
const greet2 = compose2(sign, hello, upper);
console.log(greet2('xiao')); // HELLO XIAO !!!!

// 输入 'kevin daisy kelly'，返回 'K.D.K'
function subCurry(fn: (...res: any[]) => any, ...params1: any[]) {
  return function f(...params2: any[]) {
    return fn.apply(this, params1.concat(params2));
  };
}
function curry(fn: (...res: any[]) => any, length = fn.length) {
  return function f(...params: any[]) {
    if (params.length < length) {
      return curry(subCurry.apply(this, [fn, ...params]), length - params.length);
    }
    return fn.apply(this, params);
  };
}
let split: F = (sperator: string, str: string) => str.split(sperator);
let map: F = (callback: F, arr: any[]) => arr.map(callback);
let slice: F = (str: string) => str.slice(0, 1);
let join: F = (seperator: string, arr: any[]) => arr.join(seperator);
let prop: F = (key: keyof typeof target, target: O) => target[key];
let filter: F = (callback: F, arr: any[]) => arr.filter(callback);
let equal: F = (val: string, key: keyof typeof target, target: O) => val === target[key];
let pick: F = (keys: Array<keyof typeof target>, target: O) => {
  const obj: O = {};
  keys.forEach((key) => {
    if (key in target) {
      obj[key] = target[key];
    }
  });
  return obj;
};
let sort: F = (callback: F, arr: any[]) => arr.sort(callback);

split = curry(split);
map = curry(map);
slice = curry(slice);
join = curry(join);
upper = curry(upper);
prop = curry(prop);
filter = curry(filter);
equal = curry(equal);
pick = curry(pick);
sort = curry(sort);

const init = compose2(join('.'), map(compose2(upper, slice)), split(' '));
console.log(init('kevin daisy kelly')); // K.D.K

Promise.resolve(data.tasks)
  .then(filter(equal('Scott', 'username')))
  .then(filter(equal(false, 'complete')))
  .then(map(pick(['id', 'priority', 'title', 'dueDate'])))
  .then(sort((a: DataFilterItem, b: DataFilterItem) => (a.dueDate > b.dueDate ? 1 : -1)))
  .then((res) => {
    console.log(res);
  });

export {};
