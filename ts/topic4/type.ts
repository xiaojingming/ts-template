/* eslint-disable no-unreachable-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
type Types = 'boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regexp' | 'object' | 'error' | 'null' | 'undefined' | 'window'

const str = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined Window';
const classType: { [K: string]: any } = {};
str.split(' ').forEach((type) => {
  const key = `[object ${type}]`;
  classType[key] = type.toLowerCase();
});

function getType(target: any): Types {
  if (target == null) {
    return `${(target as 'null' | 'undefined')}`;
  }
  return typeof target !== 'object'
    ? typeof target
    : classType[Object.prototype.toString.call(target)] || 'object';
}

function isFunction(target: any) {
  return getType(target) === 'function';
}

const isArray = Array.isArray || ((target: any) => getType(target) === 'array');

function isPlainObject(target: any) {
  if (!target || Object.prototype.toString.call(target) !== '[object Object]') {
    return false;
  }
  const proto = Reflect.getPrototypeOf(target);
  if (!proto) {
    return true;
  }
  const Ctor = Object.prototype.hasOwnProperty.call(target, 'constructor') && target.constructor;
  return typeof Ctor === 'function'
    && Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object);
}

function isEmptyObject(target: any) {
  for (const _ in target) {
    return false;
  }
  return true;
}

function isWindow(target: any) {
  return target !== null && target.window === target;
}

function isArrayLike(target: any) {
  const length = !!target && 'length' in target && target.length;
  const type = getType(target);
  if (type === 'function' || type === 'window') {
    return false;
  }
  return type === 'array' || length === 0
    || (typeof length === 'number' && length > 0 && (length - 1) in target);
}

function isElement(target: any) {
  return target.nodeType === 1;
}
export {};
