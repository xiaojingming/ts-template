/* eslint-disable consistent-return */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
// jQuery 的 each 方法，作为一个通用遍历方法，可用于遍历对象和数组。
// 语法为：jQuery.each(object, [callback])

interface O {
  [key: string]: any;
}
interface F {
  (...params: any[]): any;
}

function each(target: any[] | O, predicate: F) {
  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i += 1) {
      if (predicate.call(target[i], i, target[i]) === false) {
        break;
      }
    }
  } else {
    for (const key in target) {
      if (predicate.call(target[key], key, target[key]) === false) {
        break;
      }
    }
  }
}

function eachNoCall(target: any[] | O, predicate: F) {
  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i += 1) {
      if (predicate(i, target[i]) === false) {
        break;
      }
    }
  } else {
    for (const key in target) {
      if (predicate(key, target[key]) === false) {
        break;
      }
    }
  }
}

// 遍历数组
each([0, 1, 2], (i, n) => {
  console.log(`Item # ${i}: ${n}`);
});

// Item #0: 0
// Item #1: 1
// Item #2: 2

// 遍历对象
each({ name: 'John', lang: 'JS' }, (i, n) => {
  console.log(`Name: ${i}, Value: ${n}`);
});

// Name: name, Value: John
// Name: lang, Value: JS

// 退出循环
each([0, 1, 2, 3, 4, 5], (i, n) => {
  if (i > 2) {
    return false;
  }
  console.log(`Item #${i}: ${n}`);
});
console.log('%c---------------->', 'color: red;');

// Item #0: 0
// Item #1: 1
// Item #2: 2

const arr = Array.from(new Array(1000000), (v, i) => i);

console.time('for');
let sum1 = 0;
for (let i = 0; i < arr.length; i += 1) {
  sum1 += arr[i];
}
console.timeEnd('for');

console.time('each');
let sum2 = 0;
each(arr, (k, v) => {
  sum2 += v;
});
console.timeEnd('each');

console.time('eachNoCall');
let sum3 = 0;
eachNoCall(arr, (k, v) => {
  sum3 += v;
});
console.timeEnd('eachNoCall');

export {};
