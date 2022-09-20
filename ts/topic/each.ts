/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
function isArrayLike(target: any) {
  const length = !!target && 'length' in target && target.length;
  if (typeof target === 'function' || target === target.window) {
    return false;
  }
  return Array.isArray(target)
    || length === 0
    || (typeof length === 'number' && length > 0 && (length - 1) in target);
}
function each(target: any, callback: (i: number | string, v: any) => any) {
  if (isArrayLike(target)) {
    for (let i = 0; i < target.length; i += 1) {
      if (callback.call(target[i], i, target[i]) === false) {
        break;
      }
    }
  } else {
    for (const key in target) {
      if (callback.call(target[key], key, target[key]) === false) {
        break;
      }
    }
  }
}
function eachWithoutCall(target: any, callback: (i: number | string, v: any) => any) {
  if (isArrayLike(target)) {
    for (let i = 0; i < target.length; i += 1) {
      if (callback(i, target[i]) === false) {
        break;
      }
    }
  } else {
    for (const key in target) {
      if (callback(key, target[key]) === false) {
        break;
      }
    }
  }
}
let i1 = 0;
let sum1 = 0;
const num = 10000000;
console.time('not each');
for (; i1 < num; i1 += 1) {
  sum1 += i1;
}
console.timeEnd('not each');
let sum2 = 0;
let sum3 = 0;
const arr = new Array(num).fill('').map((i) => i);
console.time('each');
each(arr, (i) => {
  sum2 += Number(i);
});
console.timeEnd('each');
console.time('each without call');
each(arr, (i) => {
  sum3 += Number(i);
});
console.timeEnd('each without call');
export {};
