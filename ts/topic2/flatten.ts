/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const arr1 = [1, [2, [3, 4]]];

/**
 * 通过递归将多维数组扁平化
 * @param arr 多维数组
 * @returns 一维数组
 */
function flatten1(arr: any[]) {
  let res: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    res = res.concat(Array.isArray(arr[i]) ? flatten1(arr[i]) : arr[i]);
  }
  return res;
}
console.log(flatten1(arr1)); // [1, 2, 3, 4]

/**
 * 通过toString简化，但使用场景非常有限，只能处理元素类型都是number的情况
 * @param arr 多维数组，但元素都是数字类型
 * @returns 一维数组
 */
function flatten2(arr: any[]) {
  return arr.toString().split(',').map((v) => Number(v));
}
console.log(flatten2(arr1)); // [1, 2, 3, 4]

/**
 * 通过reduce进行简化，实现数组扁平化
 * @param arr 多维数组
 * @returns 一维数组
 */
function flatten3(arr: any[]) {
  return arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flatten3(cur) : cur), []);
}
console.log(flatten3(arr1)); // [1, 2, 3, 4]

/**
 * 通过while循环实现数组扁平化
 * @param arr 多维数组
 * @returns 一维数组
 */
function flatten4(arr: any[]) {
  let res = [].concat(...arr);
  while (res.some(Array.isArray)) {
    res = [].concat(...res);
  }
  return res;
}
console.log(flatten4(arr1)); // [1, 2, 3, 4]
console.log('%c---------------->', 'color: red;');

/**
 * 数组扁平化
 * @param arr 要处理的数组
 * @param shallow 是否只扁平一层
 * @param strict 是否严格处理元素
 * @param output 处理完后的数组
 */
function flatten(arr: any[], shallow: boolean, strict: boolean, output: any[] = []) {
  let idx = output.length;
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (Array.isArray(val)) {
      if (shallow) {
        for (let j = 0; j < val.length; j += 1) {
          output[idx++] = val[j];
        }
      } else {
        flatten(val, shallow, strict, output);
      }
    } else if (!strict) {
      output[idx++] = val;
    }
  }
  return output;
}
const arr2 = [1, [2, [3, 4]]];
console.log(flatten(arr2, true, true)); // [2, [3, 4]]
console.log(flatten(arr2, true, false)); // [1, 2, [3, 4]]
console.log(flatten(arr2, false, false)); // [1, 2, 3, 4]
console.log(flatten(arr2, false, true)); // []
console.log('%c---------------->', 'color: red;');

function $flatten(arr: any[], shallow: boolean) {
  return flatten(arr, shallow, false);
}
console.log($flatten(arr2, false)); // [1, 2, 3, 4]

// 该函数传入多个数组，然后返回传入的数组的并集，如果传入的不是数组，跳过该参数
function $union(...params: any[]) {
  return [...new Set(flatten(params, true, true))];
}
console.log($union([1, 2, 3], [101, 2, 1, 10], [2, 1])); // [1, 2, 3, 101, 10]

function $difference(...params: any[]) {
  return params[0].filter((i: number) => !flatten(params.slice(1), true, true)
    .includes(i));
}
console.log($difference([1, 2, 3, 4, 5], [5, 2, 10], [4], 3)); // [1, 3]
export {};
