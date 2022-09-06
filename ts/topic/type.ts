/* eslint-disable no-unreachable-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-new-object */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
interface O {
  [key: string]: string;
}
type Type = 'boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regexp' | 'object' | 'error' | 'null' | 'undefined';

const str = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined';
const cache: O = {};
class T {}
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
function isArray(target: any) {
  return Array.isArray ? Array.isArray : type(target) === 'array';
}
function isPlainObj(target: any) {
  const { toString, hasOwnProperty } = Object.prototype;
  if (!target || toString.call(target) !== '[object Object]') {
    return false;
  }
  const proto = Reflect.getPrototypeOf(target);
  if (!proto) {
    return true;
  }
  const Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor === 'function'
    && toString.toString.call(Ctor) === toString.toString.call(Object);
}
console.log(isPlainObj({})); // true
console.log(isPlainObj(new Object())); // true
console.log(isPlainObj(Object.create(null))); // true
// eslint-disable-next-line prefer-object-spread
console.log(isPlainObj(Object.assign({ a: 1 }, { b: 2 }))); // true
console.log(isPlainObj(Object.create({}))); // fasle
console.log(isPlainObj(new T())); // false
console.log('%c---------------->', 'color: red;');

function isEmptyObject(target: O) {
  for (const key in target) {
    return false;
  }
  return true;
}
function isWindow(target: any) {
  return target && target.window === target;
}
function isArrayLike(target: any) {
  const length = !!target && 'length' in target && target.length;
  // 排除函数和window（函数和window对象上也存在length属性）
  if (type(target) === 'function' || isWindow(target)) {
    return false;
  }
  return type(target) === 'array'
    || length === 0
    || ((typeof length === 'number') && length > 0 && ((length - 1) in target));
}
function isElement(target: any) {
  // 如果不添加!!，当target为undefined时，返回值为undefined
  return !!(target && (target.nodeType === 1));
}
export {};
