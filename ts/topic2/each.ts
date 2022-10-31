/* eslint-disable consistent-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
interface O {
  [key: string]: any;
}
interface F<T> {
  (
    i: T extends Array<any> ? number : keyof T,
    v: T extends Array<infer I> ? I : T[keyof T],
    t: T
  ): void | false;
}
function each<T>(target: T, callback: F<T>) {
  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i += 1) {
      if (callback.call(target[i], i, target[i], target) === false) {
        break;
      }
    }
  } else {
    for (const key in target) {
      if (callback.call(target[key], key, target[key], target) === false) {
        break;
      }
    }
  }
}
function each2<T>(target: T, callback: F<T>) {
  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i += 1) {
      if (callback(i, target[i], target) === false) {
        break;
      }
    }
  } else {
    for (const key in target) {
      if (callback(key, target[key], target) === false) {
        break;
      }
    }
  }
}

const arr = [0, 1, 2];
const obj = {
  name: 'xiao',
  age: 25,
};
each(arr, (i, v) => {
  if (v === 1) {
    return false;
  }
  console.log(`item #${i}:${v}`);
});
each(obj, (k, v) => {
  console.log(`key-${k}, val-${v}`);
});

const arr1 = Array.from({ length: 1000000 }, (v, i) => i);
let sum1 = 0;
let sum2 = 0;
let sum3 = 0;
console.time('for');
for (let i = 0; i < arr1.length; i += 1) {
  sum1 += arr1[i];
}
console.timeEnd('for');

console.time('each');
each(arr1, (i, v) => {
  sum2 += v;
});
console.timeEnd('each');

console.time('each2');
each(arr1, (i, v) => {
  sum3 += v;
});
console.timeEnd('each2');
export {};
