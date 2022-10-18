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

export { };
