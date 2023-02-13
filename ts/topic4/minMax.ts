/* eslint-disable no-eval */
const arr1 = [6, 4, 1, 8, 2, 11, 23];

/**
 * 通过for循环获取数组最大值
 * @param arr number类型数组
 * @returns 数组最大值
 */
function getMax1(arr: number[]) {
  let result = arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    result = Math.max(result, arr[i]);
  }
  return result;
}

console.log(getMax1(arr1)); // 23
console.log('%c---------------->', 'color: red;');

const arr2 = [6, 4, 1, 8, 2, 11, 23];

/**
 * 通过reduce获取数组中的最大值
 * @param arr number类型数组
 * @returns 数组中的最大值
 */
function getMax2(arr: number[]) {
  return arr.reduce((prev, cur) => (prev > cur ? prev : cur));
}
console.log(getMax2(arr2)); // 23
console.log('%c---------------->', 'color: red;');

const arr3 = [6, 4, 1, 8, 2, 11, 23];

/**
 * 通过sort获取数组中的最大值
 * @param arr number类型数组
 * @returns 数组中的最大值
 */
function getMax3(arr: number[]) {
  return arr.sort((a, b) => (a > b ? 1 : -1))[arr.length - 1];
}
console.log(getMax3(arr3)); // 23
console.log('%c---------------->', 'color: red;');

const arr4 = [6, 4, 1, 8, 2, 11, 23];
console.log(eval(`Math.max(${arr4})`)); // 23
console.log('%c---------------->', 'color: red;');

console.log(Math.max.apply(null, arr4)); // 23
console.log('%c---------------->', 'color: red;');

console.log(Math.max(...arr4)); // 23

export {};
