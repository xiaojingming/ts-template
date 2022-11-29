/* eslint-disable no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
interface O {
  [K: string]: any;
}

type BasicTypes = 'boolean' | 'number' | 'string' | 'function' | 'array' | 'date' | 'regexp' | 'object' | 'error' | 'null' | 'undefined';

const types: O = {};
const str = 'Boolean Number String Function Array Date RegExp Object Error Null Undefined';
str.split(' ').forEach((type) => {
  types[`[Object ${type}]`] = type.toLowerCase();
});

function getType(target: any): BasicTypes {
  return typeof target === 'object' || typeof target === 'function'
    ? types[Object.prototype.toString.call(target)] || 'object'
    : typeof target;
}

function isFunction(target: any) {
  return getType(target) === 'function';
}

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
    && Function.toString.call(Ctor) === Function.toString.call(Object);
}

const obj1 = {
  a: 1,
  b: { b1: 1, b2: 2 },
};
const obj2 = {
  b: { b1: 3, b3: 4 },
  c: 3,
};
const obj3 = {
  d: 4,
};

function extend1(target: O, ...params: O[]) {
  params.forEach((param) => {
    for (const key in param) {
      target[key] = param[key];
    }
  });
  return target;
}

// console.log(extend1(obj1, obj2, obj3));
// {
//   a: 1,
//   b: { b1: 3, b3: 4 },
//   c: 3,
//   d: 4,
// };

function extend2(isDeepOrTarget: boolean | O, ...params: O[]) {
  const firstIsBoolean = typeof isDeepOrTarget === 'boolean';
  const isDeep = firstIsBoolean && isDeepOrTarget;
  let target = firstIsBoolean ? params[0] : isDeepOrTarget;
  const _params = firstIsBoolean ? params.slice(1) : params;
  if (typeof target !== 'object' || isFunction(target)) {
    target = {};
  }
  _params.forEach((param) => {
    for (const key in param) {
      const copy = param[key];
      let val = target[key];
      if (copy === target) {
        return;
      }
      if (Array.isArray(copy)) {
        val = Array.isArray(val) ? val : [];
      } else if (isPlainObject(copy)) {
        val = isPlainObject(val) ? val : {};
      }
      target[key] = (isDeep && (typeof copy === 'object')) ? extend2(isDeep, val, copy) : copy;
    }
  });
  return target;
}
console.log(extend2(true, obj1, obj2, obj3));

// {
//   a: 1,
//   b: {
//        b1: 3,
//        b2: 2,
//        b3: 4,
//   },
//   c: 3,
//   d: 4`,
// };

const obj4 = {
  a: 1,
  b: {
    c: 2,
  },
};

const obj5 = {
  b: {
    c: [5],
  },
};

const d = extend2(true, obj4, obj5);
console.log(d);

var a: any = { name: b };
var b: any = { name: a };

const c = extend2(a, b);
console.log(c);

console.log(extend2(true, [4, 5, 6, 7, 8, 9], [1, 2, 3]));

const obj6 = {
  value: {
    3: 1,
  },
};

const obj7 = {
  value: [5, 6, 7],
};

console.log(extend2(true, obj6, obj7));

export {};
