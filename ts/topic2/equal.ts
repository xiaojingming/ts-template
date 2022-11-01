/* eslint-disable no-var */
/* eslint-disable one-var */
/* eslint-disable no-new-wrappers */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-self-compare */
/* eslint-disable no-unused-vars */
var a1: any;
var b1: any;
a1 = { foo: { b: { foo: { c: { foo: null } } } } };
b1 = { foo: { b: { foo: { c: { foo: null } } } } };
a1.foo.b.foo.c.foo = a1;
b1.foo.b.foo.c.foo = b1;

function isFunction(target: any) {
  return Object.prototype.toString.call(target) === '[object Function]';
}
function deepEq(a: any, b: any, aStack: any[], bStack: any[]) {
  const { toString } = Object.prototype;
  const classA = toString.call(a);
  const classB = toString.call(b);
  if (classA === classB) {
    switch (classA) {
      case '[object String]':
      case '[object RegExp]':
        return `${classA}` === `${classB}`;
      case '[object Boolean]':
      case '[object Date]':
        return +classA === +classB;
      case '[object Number]':
        if (+a !== +a) {
          return +b !== +b;
        }
        return +a === 0 ? (1 / +a) === (1 / +b) : +a === +b;
      default:
        break;
    }
  }
  const isArray = classA === '[object Array]';
  if (!isArray) {
    if (typeof a !== 'object' || typeof b !== 'object') {
      return false;
    }
    const aCtor = a.constructor;
    const bCtor = b.constructor;
    if (aCtor !== bCtor
      && !((isFunction(aCtor) && aCtor instanceof aCtor)
        && (isFunction(bCtor) && bCtor instanceof bCtor))
    ) {
      return false;
    }
  }
  // 处理循环引用的情况
  let { length: stackLength } = aStack;
  while (stackLength--) {
    if (aStack[stackLength] === a) {
      return bStack[stackLength] === b;
    }
  }
  aStack.push(a);
  bStack.push(b);
  if (isArray) {
    let lengthA = a.length;
    if (b.length && lengthA !== b.length) {
      return false;
    }
    while (lengthA--) {
      if (!equal(a[lengthA], b[lengthA], aStack, bStack)) {
        return false;
      }
    }
  } else {
    let aKeysLength = Object.keys(a).length;
    if (aKeysLength !== Object.keys(b).length) {
      return false;
    }
    while (aKeysLength--) {
      const valA = Object.values(a)[aKeysLength];
      const valB = Object.values(b)[aKeysLength];
      if (!(equal(valA, valB, aStack, bStack))) {
        return false;
      }
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
}

function equal(a: any, b: any, aStack: any[] = [], bStack: any[] = []) {
  // +0、-0
  if (a === b) {
    return a !== 0 || (1 / a) === (1 / b);
  }
  // 避免null的干扰
  if (a === null || b === null) {
    return false;
  }
  // NaN
  if (a !== a) {
    return b !== b;
  }
  const type = typeof a;
  if (type !== 'object' && type !== 'function' && typeof b !== 'object') {
    return false;
  }
  return deepEq(a, b, aStack, bStack);
}

console.log(equal([1, 2, 3], [1, 2, 3])); // true
console.log(equal({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(equal([{ a: [1, 2, 3] }], [{ a: [1, 2, 3] }])); // true
console.log(equal('xiao', new String('xiao'))); // true
console.log(equal(Object.create({}), {})); // true
console.log(equal(a1, b1)); // true

export {};
