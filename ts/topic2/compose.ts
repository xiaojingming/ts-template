/* eslint-disable no-unused-vars */
import {
  Item, data,
} from '../../data';

interface F {
  (...res: any[]): any;
}

const toUppercase = (input: string) => input.toUpperCase();
const hello = (input: string) => `HELLO ${input}`;
const head = (input: string) => `!!! ${input}`;
const copy = (input: string) => `${input.repeat(2)}`;
function compose(...fs: F[]) {
  return function f(input: string) {
    return fs.reduceRight((prev, cur) => cur(prev), input);
  };
}
const greet = compose(copy, head, hello, toUppercase);
console.log(greet('kevin'));
console.log('%c---------------->', 'color: red;');

function subCurry(f: F, ...res1: any[]) {
  return function fn(...res2: any[]) {
    return f.apply(this, res1.concat(res2));
  };
}
function curry(f: F, length = f.length) {
  return function fn(...params: any[]) {
    if (params.length >= length) {
      return f.apply(this, params);
    }
    return curry(subCurry.apply(this, [f, ...params]), length - params.length);
  };
}
// 输入 'kevin daisy kelly'，返回 'K.D.K'
const str = 'kevin daisy kelly';
const split = (seperator: string, input: string) => input.split(seperator);
const map = (callback: F, input: any[]) => input.map(callback);
const slice = (input: string) => input.slice(0, 1);
const join = (sperator: string, input: any[]) => input.join(sperator);
const cSplit = curry(split);
const cMap = curry(map);
const cSlice = curry(slice);
const cUpper = curry(toUppercase);
const cJoin = curry(join);

const init = compose(cJoin('.'), cMap(compose(cUpper, cSlice())), cSplit(' '));
console.log(init(str)); // K.D.K
console.log('%c---------------->', 'color: red;');

const fetchData = () => Promise.resolve(data);
const prop = <T>(key: keyof T, input: T) => input[key];
const filter = (callback: F, input: any[]) => input.filter(callback);
const equal = (target: any, key: keyof Item, val: Item) => val[key] === target;
const pick = (props: Array<keyof Item>, target: Item) => {
  const obj: { [k: string]: any } = {};
  props.forEach((key) => {
    obj[key] = target[key];
  });
  return obj;
};
const sort = (callback: F, input: any[]) => input.sort((a, b) => (
  new Date(callback(a)) > new Date(callback(b)) ? 1 : -1));
const cProp = curry(prop);
const cFilter = curry(filter);
const cEqual = curry(equal);
const cPick = curry(pick);
const cSort = curry(sort);

const getIncompleteTaskSummaries = (target: string) => fetchData()
  .then(cProp('tasks'))
  .then(cFilter(cEqual(target, 'username')))
  .then(cFilter(cEqual(false, 'complete')))
  .then(cMap(cPick(['id', 'priority', 'dueDate', 'created'])))
  .then(cSort(cProp('dueDate')))
  .then(((res) => {
    console.log(res);
  }));

getIncompleteTaskSummaries('Scott');

export {};
