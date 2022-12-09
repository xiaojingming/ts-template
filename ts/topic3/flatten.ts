/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const arr1 = [1, [2, [3, 4]], [5, 6], [[7, 8]]];
const arr2 = [[1, [2, [3]]], 4, [5, [6]]];

/**
 * 通过for循环与递归实现数组扁平化
 * @param arr 目标多维数组
 * @returns 扁平化后的一维数组
 */
function flatten1(arr: any[]) {
  let res: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (Array.isArray(val)) {
      res = res.concat(flatten1(val));
    } else {
      res.push(val);
    }
  }
  return res;
}

console.log(flatten1(arr1)); // [1, 2, 3, 4]

/**
 * 将多维数组转换为一维数组，只能处理数组元素都为number类型
 * @param arr 目标多维数组，且内容均为数字类型
 * @returns 一维数组
 */
function flatten2(arr: any[]) {
  return arr.toString().split(',').map((i) => Number(i));
}

console.log(flatten2(arr1)); // [1, 2, 3, 4]

/**
 * 通过reduce代替for循环来实现扁平化
 * @param arr 目标多维数组
 * @returns 一维数组
 */
function flatten3(arr: any[]) {
  return arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flatten3(cur) : cur), []);
}

console.log(flatten3(arr1)); // [1, 2, 3, 4]

/**
 * 通过扩展运算符扁平一层配合while循环来实现递归
 * @param arr 目标多维数组
 * @returns 一维数组
 */
function flatten4(arr: any[]) {
  let target: any[] = arr.concat();
  while (target.some(Array.isArray)) {
    target = [].concat(...target);
  }
  return target;
}

console.log(flatten4(arr1)); // [1, 2, 3, 4]
console.log('%c---------------->', 'color: red;');

/**
 * 数组扁平化
 * @param arr 多维数组
 * @param shallow 是否只扁平一层
 * @param strict 是否严格处理元素
 * @param output 方便递归所传递的参数
 */
function flatten(arr: any[], shallow: boolean, strict: boolean) {
  let res: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (Array.isArray(val)) {
      if (shallow) {
        res = res.concat(val);
      } else {
        res = res.concat(flatten(val, shallow, strict));
      }
    } else if (!strict) {
      res.push(val);
    }
  }
  return res;
}

console.log(flatten(arr1, true, true)); // [2, [3, 4], 5, 6, [7, 8]]
console.log(flatten(arr1, true, false)); // [1, 2, [3, 4], 5, 6, [7, 8]]
console.log(flatten(arr1, false, true)); // []
console.log(flatten(arr1, false, false)); // [1, 2, 3, 4, 5, 6, 7, 8]

// console.log(flatten(arr2, true, true));
// console.log(flatten(arr2, true, false));
// console.log(flatten(arr2, false, true));
// console.log(flatten(arr2, false, false));

console.log('%c---------------->', 'color: red;');

function _flatten(arr: any[], shallow: boolean) {
  return flatten(arr, shallow, false);
}

function _union(...res: any[]) {
  return [...new Set(flatten(res, true, true))];
}

console.log(_union([1, 2, 3], [101, 2, 1, 10], 4, 5));
// [1, 2, 3, 101, 10]

function _difference(...res: any[]) {
  const target: any[] = res[0];
  return target.filter((item) => !flatten(res.slice(1), true, true).includes(item));
}

console.log(_difference([1, 2, 3, 4, 5], [5, 2, 10], [4], 3));
// [1, 3]

// Function.apply.bind([].concat, []);

function f(arg: any) {
  return Function.apply.call([].concat, [], arg);
  // return [].concat.apply([], arg);
  // return [].concat(...arg);
}

export {};
