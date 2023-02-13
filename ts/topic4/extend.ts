/* eslint-disable no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
var a: any = { name: b };
var b: any = { name: a };

interface Obj {
  [K: string]: any
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

function isPlainObject(target: any) {
  if (target && typeof target !== 'object') {
    return false;
  }
  const proto = Reflect.getPrototypeOf(target);
  if (!proto) {
    return true;
  }
  const Ctor = Reflect.get(target, 'constructor');
  return Ctor
    && typeof Ctor === 'object'
    && Function.toString.call(Ctor) === Function.toString.call(Object);
}

function extend(deepOrtarget: boolean | Obj, ...params: Obj[]) {
  const firstIsBoolean = typeof deepOrtarget === 'boolean';
  const isDeep = firstIsBoolean ? deepOrtarget : false;
  let target = firstIsBoolean ? params[0] : deepOrtarget;
  if (typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }
  const $params = firstIsBoolean ? params.slice(1) : params;
  $params.forEach((param) => {
    for (const key in param) {
      const copy = param[key];
      if (target === copy) {
        break;
      }
      if (copy && typeof copy === 'object' && isDeep) {
        let $target;
        if (Array.isArray(copy)) {
          $target = Array.isArray(target[key]) ? target[key] : [];
        } else {
          $target = isPlainObject(target[key]) ? target[key] : {};
        }
        target[key] = extend(true, $target, copy);
      } else {
        target[key] = copy;
      }
    }
  });
  return target;
}

console.log(extend(true, obj1, obj2, obj3));
console.log('%c---------------->', 'color: red;');

const obj5 = {
  a: 1,
  b: {
    c: 2,
  },
};

const obj6 = {
  b: {
    c: [5],
  },
};

console.log(extend(true, obj5, obj6));
console.log('%c---------------->', 'color: red;');

console.log(extend(a, b));
const a1 = {
  value: {
    3: 1,
  },
};

const a2 = {
  value: [5, 6, 7],
};

const b1 = extend(true, a1, a2); // ???
const c1 = extend(true, a1, a2); // ???
console.log(b1, c1);

export {};
