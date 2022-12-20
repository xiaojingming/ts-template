/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// 输入 'kevin'，返回 'HELLO, KEVIN'。
import { data } from '../../data';

interface F {
  (...res: any[]): any,
}

function upper(input: string) {
  return input.toUpperCase();
}
function hello(input: string) {
  return `HELLO, ${input}`;
}
function compose(...params: F[]) {
  return function fn(input: string) {
    return params.reduceRight((prev, cur) => cur(prev), input);
  };
}

const greet = compose(hello, upper);
console.log(greet('kevin')); // 'HELLO, KEVIN'
console.log('%c---------------->', 'color: red;');

// 输入 'kevin daisy kelly'，返回 'K.D.K'
function subCurry(fn: F, ...params: any[]) {
  return function f(...subParams: any[]) {
    return fn.apply(this, params.concat(subParams));
  };
}
function curry(fn: F, length = fn.length) {
  return function f(...params: any[]) {
    if (params.length >= length) {
      return fn.apply(this, params);
    }
    return curry(subCurry.apply(this, [fn, ...params]), length - params.length);
  };
}
function split(sperator: string, input: string) {
  return input.split(sperator);
}
function map(callback: F, input: any[]) {
  return input.map(callback);
}
function slice(input: string) {
  return input.slice(0, 1);
}
function join(sperator: string, input: any[]) {
  return input.join(sperator);
}

const splitCurry = curry(split);
const mapCurry = curry(map);
const sliceCurry = curry(slice);
const joinCurry = curry(join);
const upperCurry = curry(upper);

const init = compose(joinCurry('.'), mapCurry(compose(upperCurry, sliceCurry)), splitCurry(' '));
console.log(init('kevin daisy kelly')); // K.D.K
console.log('%c---------------->', 'color: red;');

function filter(callback: F, input: any[]) {
  return input.filter(callback);
}
function get(key: string, input: any) {
  return input[key];
}
function equal(val: any, input: any) {
  return input === val;
}
function pick(keys: string[], input: any) {
  return keys.reduce((prev, cur) => {
    // eslint-disable-next-line no-param-reassign
    prev[cur] = input[cur];
    return prev;
  }, ({} as { [key: string]: any }));
}
function sort(callback: F, input: any[]) {
  return input.sort((a: any, b: any) => ((callback(a) > callback(b)) ? 1 : -1));
}
function time(input: string) {
  return new Date(input);
}

const filterCurry = curry(filter);
const getCurry = curry(get);
const equalCurry = curry(equal);
const pickCurry = curry(pick);
const sortCurry = curry(sort);
const timeCurry = curry(time);

const getIncompleteTaskSummaries = function fn(membername: string) {
  return Promise.resolve(data.tasks)
    .then(filterCurry(compose(equalCurry(membername), getCurry('username'))))
    .then(filterCurry(compose(equalCurry(false), getCurry('complete'))))
    .then(mapCurry(pickCurry(['id', 'priority', 'dueDate', 'title'])))
    .then(sortCurry(compose(timeCurry, getCurry('dueDate'))))
    .then(console.log);
};
getIncompleteTaskSummaries('Scott');

export {};
