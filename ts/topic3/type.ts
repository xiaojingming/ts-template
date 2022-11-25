/* eslint-disable no-new-object */
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

// 纯粹的对象：没有原型的对象，或者构造函数是Object
function isPlainObject(target: any) {
  if (!target || typeof target !== 'object') {
    return false;
  }
  const proto = Reflect.getPrototypeOf(target);
  if (!proto) {
    return true;
  }
  const Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor === 'function'
    && (() => {}).toString.call(Ctor) === (() => {}).toString.call(Object);
}

class Person {}

console.log(isPlainObject({})); // true
console.log(isPlainObject(new Object())); // true
console.log(isPlainObject(Object.create(null))); // true
// eslint-disable-next-line prefer-object-spread
console.log(isPlainObject(Object.assign({ a: 1 }, { b: 2 }))); // true
console.log(isPlainObject(Object.create({}))); // false
console.log(isPlainObject(new Person())); // false

function isWindow(target: any) {
  return target && target.window === target;
}

// 数组/伪数组
function isArrayLike(target: any) {
  const length = !!target && 'length' in target && target.length;
  const type = getType(target);
  // 去除function和window类型，这两个类型都包括length属性
  if (type === 'function' || isWindow(target)) {
    return false;
  }
  return type === 'array' || length === 0
    || (typeof length === 'number' && length > 0 && (length - 1) in target);
}

function isElement(target: any) {
  return target && ((target as HTMLElement).nodeType === 1);
}

export {};
