/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
interface O {
  [key: string]: string;
}
type Type = 'boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regexp' | 'object' | 'error' | 'null' | 'undefined';

const str = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined';
const cache: O = {};

str.split(' ').forEach((item) => {
  const key = `[object ${item}]`;
  cache[key] = item.toLowerCase();
});

function type(target: any): Type {
  if (target == null) {
    return (`${target}` as Type);
  }
  return typeof target === 'function' || typeof target === 'object'
    ? Reflect.get(cache, Object.prototype.toString.call(target)) || 'object'
    : typeof target;
}
function isFunction(target: any) {
  return type(target) === 'function';
}
console.log(isFunction(() => []));
function isArray(target: any) {
  return Array.isArray ? Array.isArray : type(target) === 'array';
}
export {};
