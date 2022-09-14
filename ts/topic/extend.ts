/* eslint-disable no-continue */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
interface O {
  [key: string]: any
}

function isPlainObject(target: any) {
  const { toString, hasOwnProperty } = Object.prototype;
  if (toString.call(target) !== '[object Object]') {
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

function extend1(...res: O[]) {
  const target = res[0];
  for (let i = 1; i < res.length; i += 1) {
    for (const key in res[i]) {
      target[key] = res[i][key];
    }
  }
  return target;
}
const obj1 = {
  a: 1,
  b: { b1: 1, b2: 2 },
};
const obj2 = {
  b: { b1: 3, b3: 4 },
};
const obj3 = {
  d: 4,
};
// console.log(extend1(obj1, obj2, obj3)); // {a: 1, b: {b1: 3, b3: 4}, d: 4}
console.log('%c---------------->', 'color: red;');

/**
 * 深浅拷贝
 * @param deepOrTarget 是否深拷贝/目标对象
 * @param res 剩余对象
 */
function extend2(deepOrTarget: boolean | O, ...res: O[]) {
  const firstIsBoolean = typeof deepOrTarget === 'boolean';
  let target = firstIsBoolean ? res[0] : deepOrTarget;
  const params = firstIsBoolean ? res.slice(1) : res;
  if (typeof target !== 'object') {
    target = {};
  }
  for (let i = 0; i < params.length; i += 1) {
    const obj = params[i];
    for (const key in obj) {
      const val = obj[key];
      if (deepOrTarget === true && typeof val === 'object') {
        target[key] = extend2(true, target[key], val);
      } else {
        target[key] = val;
      }
    }
  }
  return target;
}
console.log(extend2(true, obj1, obj2, obj3)); // { a: 1, b: { b1: 3, b2: 2, b3: 4 }, c: 3, d: 4 }
console.log('%c---------------->', 'color: red;');

function extend3(deepOrTarget: boolean | O, ...res: O[]) {
  const firstIsBoolean = typeof deepOrTarget === 'boolean';
  let target = firstIsBoolean ? res[0] : deepOrTarget;
  const params = firstIsBoolean ? res.slice(1) : res;
  if (typeof target !== 'object') {
    target = {};
  }
  for (let i = 0; i < params.length; i += 1) {
    const obj = params[i];
    for (const key in obj) {
      const copy = obj[key];
      let cTarget = target[key];
      // 解决循环引用问题
      if (copy === target) {
        continue;
      }
      if (deepOrTarget === true && typeof copy === 'object') {
        if (Array.isArray(copy)) {
          cTarget = Array.isArray(cTarget) ? cTarget : [];
        } else if (isPlainObject(copy)) {
          cTarget = isPlainObject(cTarget) ? cTarget : {};
        }
        target[key] = extend3(true, cTarget, copy);
      } else {
        target[key] = copy;
      }
    }
  }
  return target;
}
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
console.log(extend3(false, obj4, obj5));
console.log('%c---------------->', 'color: red;');

var a: any = { name: b };
var b: any = { name: a };
var c = extend3(a, b);
console.log(c);
console.log('%c---------------->', 'color: red;');

console.log(extend3(true, [4, 5, 6, 7, 8, 9], [1, 2, 3])); // [1, 2, 3, 7, 8, 9]

const obj6 = {
  value: {
    3: 1,
  },
};
const obj7 = {
  value: [5, 6, 7],
};
console.log(extend3(true, obj6, obj7)); // { value: [5, 6, 7] }
console.log(extend3(true, obj7, obj6)); // { value: [5, 6, 7] }
export {};
