/* eslint-disable no-unused-vars */
interface O {
  [K: string]: any;
}
type BasicTypes = 'boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regexp' | 'object' | 'error' | 'null' | 'undefined';

const obj: O = {};
const str = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined';
str.split(' ').forEach((type) => {
  const key = `[object ${type}]`;
  obj[key] = type.toLowerCase();
});

function getType(target: any): BasicTypes {
  // if (target == '') {
  //   return (`${target}`);
  // }
  return typeof target === 'object' || typeof target === 'function'
    ? obj[Object.prototype.toString.call(target)] || 'object'
    : target;
}

function isFunction(target: any) {
  return getType(target) === 'function';
}

export {};
