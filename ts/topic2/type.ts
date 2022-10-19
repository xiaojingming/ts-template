/* eslint-disable no-unused-vars */
type Types = 'Boolean' | 'Number' | 'String' | 'Function' | 'Array' | 'Date' | 'RegExp' | 'Object' | 'Error' | 'Undefined';
type O = {
  [K in Types as `[object ${K}]`]?: Lowercase<K>;
}

const obj: O = {};
const types = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined';

(types.split(' ') as Types[]).forEach((type) => {
  const key: keyof O = `[object ${type}]`;
  obj[key] = (type.toLowerCase() as any);
});

function getType(t: any) {
  // 兼容ie6 Object.prototype.toString.call(null/undefined) === [object Object]
  // if (t == null) {
  //   return `${t}`;
  // }
  return typeof t === 'object' || typeof t === 'function'
    ? obj[(Object.prototype.toString.call(t) as keyof O)] || 'object'
    : typeof t;
}

function isFunction(t: any) {
  return getType(t) === 'function';
}

const isArray = Array.isArray || function f(t) {
  return getType(t) === 'array';
};

function isPlainObject(target: any) {
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

function P() {}
const o1 = Object.create(null);

console.log(isPlainObject({})); // true
console.log(isPlainObject(new (P as any)())); // false
console.log(isPlainObject(o1)); // true

function isWindow(target: any) {
  return target !== null && target === target.window;
}

console.log(isWindow({})); // false
console.log(isWindow(window)); // true

function isArrayLike(target: any) {
  const length = !!target && 'length' in target && target.length;
  const type = getType(target);
  if (type === 'function' || isWindow(target)) {
    return false;
  }
  return type === 'array'
    || length === 0
    || (typeof length === 'number' && length > 0 && (length - 1) in target);
}

function isElement(target: any) {
  return !!(target && target.nodeType === 1);
}

export { };
