/* eslint-disable vars-on-top */
/* eslint-disable no-use-before-define */
/* eslint-disable no-var */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
interface O {
  [key: string]: any;
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
var a: any = { name: b };
var b: any = { name: a };
const obj6 = {
  value: {
    3: 1,
  },
};

const obj7 = {
  value: [5, 6, 7],
};

function isPlainObject(target: any[]) {
  const { toString, hasOwnProperty } = Object.prototype;
  if (!!target || toString.call(target) !== '[object Object]') {
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
/**
 * 目标对象浅拷贝
 * @param target 目标对象
 * @param params 参数对象数组
 * @returns 合并后的目标对象
 */
function extends1(target: O, ...params: O[]) {
  params.forEach((param) => {
    Object.keys(param).forEach((key) => {
      target[key] = param[key];
    });
  });
  return target;
}
// console.log(extends1(obj1, obj2, obj3));

/**
 * 目标对象深拷贝
 * @param target 目标对象
 * @param params 参数对象数组
 * @returns 合并后的目标对象
 */
function extends2(target: O, ...params: O[]) {
  params.forEach((param) => {
    Object.keys(param).forEach((key) => {
      target[key] = typeof target[key] === 'object' ? extends2(target[key], param[key]) : param[key];
    });
  });
  return target;
}
// console.log(extends2(obj1, obj2, obj3));

/**
 * 通过第一个参数来确定目标对象是进行深拷贝还是浅拷贝
 * @param targetOrDeep 目标对象或是否是深拷贝标识
 * @param params 参数对象[如果targetOrDeep的类型是boolean时，params第一个参数为目标对象]
 * @returns 合并后的目标对象
 */
function extend(targetOrDeep: O | boolean, ...params: O[]) {
  const hasDeep = typeof targetOrDeep === 'boolean';
  let target = hasDeep ? params[0] : targetOrDeep;
  const deep = hasDeep ? targetOrDeep : false;
  const $params = hasDeep ? params.slice(1) : params;
  if (typeof target !== 'function' && typeof target !== 'object') {
    target = {};
  }
  $params.forEach((param) => {
    Object.keys(param).forEach((key) => {
      const isObject = typeof param[key] === 'object';
      if (target === param[key]) {
        return;
      }
      if (deep && isObject) {
        if (Array.isArray(param[key])) {
          target[key] = Array.isArray(target[key]) ? target[key] : [];
        } else {
          target[key] = isPlainObject(target[key]) ? target[key] : {};
        }
        target[key] = extend(target[key], param[key]);
      } else {
        target[key] = param[key];
      }
    });
  });
  return target;
}
// console.log(extend(true, obj1, obj2, obj3));
// console.log(extend(true, obj4, obj5));
console.log(extend(a, b));
console.log(extend(true, [4, 5, 6, 7, 8, 9], [1, 2, 3]));
console.log(extend(true, obj6, obj7));
export {};
