/* eslint-disable no-unused-vars */
type Types = 'boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regexp' | 'object' | 'error' | 'null' | 'undefined'

const str = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined';
const typeMap: { [K: string]: any } = {};
str.split(' ').forEach((type) => {
  const key = `[object ${type}]`;
  typeMap[key] = type.toLowerCase();
});

function getType(target: any): Types {
  if (target == null) {
    return (`${target}` as 'null' | 'undefined');
  }
  return typeof target === 'object' || typeof target === 'function'
    ? typeMap[Object.prototype.toString.call(target)] || 'object'
    : target;
}

function isFunction(target: any) {
  return getType(target) === 'function';
}

const isArray = Array.isArray || ((target: any) => getType(target) === 'array');

export {};
