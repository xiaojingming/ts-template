/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const arr1 = [1, [2, [3, 4]]];
/**
 * 通过递归+for循环实现
 * @param arr 多维数组
 * @returns 一维数组
 */
function flatten1(arr: any[]) {
  let res : any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    res = res.concat(Array.isArray(val) ? flatten1(val) : val);
  }
  return res;
}
console.log(flatten1(arr1)); // [1, 2, 3, 4]

const arr2 = [1, [2, [3, 4]]];
/**
 * 通过toString实现（使用场景十分有限，只能适用于数组每一项都是数字）
 * @param arr 多维数组（数组中的每一项都是数字）
 * @returns 一维数组
 */
function flatten2(arr: any[]) {
  const str = arr.toString();
  return str.split(',').map((i) => Number(i));
}
console.log(flatten2(arr2)); // [1, 2, 3, 4]

const arr3 = [1, [2, [3, 4]]];
/**
 * 通过reduce简化for循环
 * @param arr 多维数组
 * @returns 一维数组
 */
function flatten3(arr: any[]): any[] {
  return arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flatten3(cur) : cur), []);
}
console.log(flatten3(arr3)); // [1, 2, 3, 4]

const arr4 = [1, [2, [3, 4]]];
function flatten4(arr: any[]) {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
  return arr;
}
console.log(flatten4(arr4)); // [1, 2, 3, 4]
console.log('%c---------------->', 'color: red;');

const arr5 = [1, [2, [3, 4]]];
const arr6 = [1, 2, [3, 4]];
/**
 * 数组扁平化
 * @param arr 多维数组
 * @param shallow 是否只扁平一层
 * @param strict 是否严格处理元素
 * @param output 一维数组
 * @returns 一维数组
 */
function flatten(
  arr: any[],
  shallow: boolean,
  strict: boolean,
  output: any[] = [],
) {
  let index = output.length;
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (Array.isArray(val)) {
      if (shallow) {
        for (let j = 0; j < val.length; j += 1) {
          output[index++] = val[j];
        }
      } else {
        flatten(val, shallow, strict, output);
      }
    } else if (!strict) {
      output[index++] = val;
    }
  }
  return output;
}
console.log(flatten(arr6, true, true)); // [3, 4]
console.log(flatten(arr5, true, false)); // [1, 2, [3, 4]]
console.log(flatten(arr5, false, true)); // []
console.log(flatten(arr5, false, false)); // [1, 2, 3, 4]
console.log('%c---------------->', 'color: red;');

function _flatten(arr: any[], shallow: boolean) {
  return flatten(arr, shallow, false);
}
console.log(_flatten(arr5, false)); // [1, 2, 3, 4]
function _union(...res: any[]) {
  return [...new Set(flatten(res, true, true))];
}
console.log(_union([1, 2, 3], [101, 2, 1, 10], 4, 5)); // [1, 2, 3, 101, 10]
function _difference(target: any[], ...res: any[]) {
  return target.filter((item) => !new Set(flatten(res, true, true)).has(item));
}
console.log(_difference([1, 2, 3, 4, 5], [5, 2, 10], [4], 3));
export {};
