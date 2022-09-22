/* eslint-disable one-var-declaration-per-line */
/* eslint-disable no-var */
/* eslint-disable one-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-new-wrappers */
/* eslint-disable no-self-compare */
/* eslint-disable no-unused-vars */
var a1, b1;

a1 = { foo: { b: { foo: { c: { foo: null } } } } };
b1 = { foo: { b: { foo: { c: { foo: null } } } } };
(a1.foo.b.foo.c.foo as any) = a1;
(b1.foo.b.foo.c.foo as any) = b1;

function deepEq(a: any, b: any, aStack: any[] = [], bStack: any[] = []) {
  // 处理字面量和构造函数创建的对象如：new String('xiao')和'xiao'
  const { toString } = Object.prototype;
  const classNameA = toString.call(a);
  const classNameB = toString.call(b);
  if (classNameA !== classNameB) {
    return false;
  }
  switch (classNameA) {
    case '[object String]':
    case '[object RegExp]':
      return String(a) === String(b);
    case '[object Boolean]':
    case '[object Date]':
      return +a === +b;
    case '[object Number]':
      if (+a !== +a) {
        return +b !== +b;
      }
      return +a === 0 ? (1 / +a) === (1 / +b) : +a === +b;
    default:
      break;
  }
  if (!Array.isArray(a)) {
    if (typeof a !== 'object' || typeof b !== 'object') {
      return false;
    }
    const aCtor = a.constructor;
    const bCtor = b.constructor;
    if (
      ('constructor' in a && 'constructor' in b)
      && (aCtor !== bCtor)
      && !(typeof aCtor === 'function' && aCtor instanceof aCtor && typeof bCtor === 'function' && bCtor instanceof bCtor)
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
  if (Array.isArray(a)) {
    const { length: aLength } = a;
    const { length: bLength } = b;
    if (aLength !== bLength) {
      return false;
    }
    for (let i = 0; i < aLength; i += 1) {
      if (!eq(a[i], b[i], aStack, bStack)) {
        return false;
      }
    }
  } else {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    let aKeysLength = aKeys.length;
    if (aKeysLength !== bKeys.length) {
      return false;
    }
    while (aKeysLength--) {
      const key = aKeys[aKeysLength];
      if (!(Object.prototype.hasOwnProperty.call(b, key) && eq(a[key], b[key], aStack, bStack))) {
        return false;
      }
    }
  }
  aStack.pop();
  bStack.pop();
  return true;
}

function eq(a: any, b : any, aStack: any[] = [], bStack: any[] = []) {
  // 判断+0、-0，我们认为+0和-0不相等
  if (a === b) {
    return a !== 0 || (1 / a) === (1 / b);
  }
  // 让null退出避免干扰后面的判断
  if (a == null || b == null) {
    return false;
  }
  // 处理NaN
  if (a !== a) {
    return b !== b;
  }
  const type = typeof a;
  if (type !== 'function' && type !== 'object' && typeof b !== 'object') {
    return false;
  }
  return deepEq(a, b, aStack, bStack);
}

console.log(eq('xiao', new String('xiao'))); // true
console.log(eq(/abc/, new RegExp('abc'))); // true
console.log(eq(true, new Boolean(true))); // true
console.log(eq(new Date(), new Date())); // true
console.log(eq(0, new Number(0))); // true
console.log(eq(+0, new Number(+0))); // true
console.log(eq(+0, new Number(-0))); // false
// console.log(eq({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(eq(a1, b1));
export {};
