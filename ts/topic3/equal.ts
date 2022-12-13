/* eslint-disable one-var-declaration-per-line */
/* eslint-disable no-var */
/* eslint-disable one-var */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable default-case */
/* eslint-disable no-self-compare */
/* eslint-disable no-unused-vars */
var a1: any, b1: any;

a1 = { foo: { b: { foo: { c: { foo: null } } } } };
b1 = { foo: { b: { foo: { c: { foo: null } } } } };
a1.foo.b.foo.c.foo = a1;
b1.foo.b.foo.c.foo = b1;

function deepEqual(
  a: any,
  b: any,
  aStack: any[] = [],
  bStack: any[] = [],
) {
  // 处理形如new String('xxx')和'xxx'的情况
  const { toString } = Object.prototype;
  const classA = toString.call(a);
  if (classA !== toString.call(b)) {
    return false;
  }
  if (classA === toString.call(b)) {
    switch (classA) {
      case '[object String]':
      case '[object RegExp]':
        return `${a}` === `${b}`;
      case '[object Boolean]':
      case '[object Date]':
        return +a === +b;
      case '[object Number]':
        if (+a !== +a) {
          return +b !== +b;
        }
        return +a === 0
          ? (1 / (+a)) === (1 / (+b))
          : +a === +b;
    }
  }
  // 构造函数实例判断
  if (!Array.isArray(a)) {
    if (typeof a !== 'object' || typeof b !== 'object') {
      return false;
    }
    // 只有当a、b的构造函数都存在且不相等，并且都不是Object的情况下，才能判断a、b不相等
    const Actor = a.constructor;
    const Bctor = b.constructor;
    if (
      Actor !== Bctor && (
        !(typeof Actor === 'function' && Actor instanceof Actor
        && typeof Bctor === 'function' && Bctor instanceof Bctor
        && ('constructor' in a && 'constructor' in b))
      )
    ) {
      return false;
    }
  }
  let { length: aStackLength } = aStack;
  while (aStackLength--) {
    if (aStack[aStackLength] === a) {
      return bStack[aStackLength] === b;
    }
  }
  aStack.push(a);
  bStack.push(b);
  // 数组和对象的相等判断
  if (Array.isArray(a)) {
    let { length: bLength } = b;
    if (a.length !== bLength) {
      return false;
    }
    while (bLength--) {
      if (!equal(a[bLength], b[bLength], aStack, bStack)) {
        return false;
      }
    }
  } else {
    const aKeys = Object.keys(a);
    let { length: aLength } = Object.keys(a);
    const { length: bLength } = Object.keys(b);
    if (aLength !== bLength) {
      return false;
    }
    while (aLength--) {
      const key = aKeys[aLength];
      if (!(Object.prototype.hasOwnProperty.call(b, key)
        && equal(a[key], b[key], aStack, bStack))) {
        return false;
      }
    }
  }
  return true;
}

function equal(a: any, b: any, aStack: any[] = [], bStack: any[] = []) {
  // 区分+0和-0
  if (a === b) {
    return a !== 0 || (1 / a) === (1 / b);
  }
  // 让null的情况尽快退出函数
  if (a === null || b === null) {
    return false;
  }
  // 区分NaN
  if (a !== a) {
    return b !== b;
  }
  // 判断a的类型，如果a是基本类型且b不是引用类型，则直接返回false
  const type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b !== 'object') {
    return false;
  }
  return deepEqual(a, b, aStack, bStack);
}

const obj1 = {
  a: 1,
  b: [1, 2, { a: 3 }],
};
const obj2 = {
  a: 1,
  b: [1, 2, { a: 3 }],
};

console.log(equal(obj1, obj2)); // true
console.log(equal(a1, b1)); // true

export {};
