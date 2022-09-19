/* eslint-disable no-unused-vars */
/**
 * 返回数组中满足提供的测试函数的第一个元素的索引
 * @param arr 目标数组
 * @param predicate 回调函数
 * @param context 执行回调时调用的this指向
 * @returns 数组中第一个满足所提供测试函数的元素的值或-1
 */
function findIndex(
  arr: any[],
  predicate: (...res: any[]) => boolean,
  context: any = window,
) {
  for (let i = 0; i < arr.length; i += 1) {
    if (predicate.call(context, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}
const arr1 = [1, 2, 3, 4];
const f1 = (item: number) => item === 3;
console.log(findIndex(arr1, f1)); // 2
console.log('%c---------------->', 'color: red;');

/**
 * 返回数组中满足提供的测试函数的最后一个元素的索引
 * @param arr 目标数组
 * @param predicate 回调函数
 * @param context 执行回调时调用的this指向
 * @returns 数组中最后一个满足所提供测试函数的元素的值或-1
 */
function findLastIndex(
  arr: any[],
  predicate: (...res: any[]) => boolean,
  context: any = window,
) {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (predicate.call(context, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}
const arr2 = [1, 2, 3, 2];
const f2 = (i: number) => i === 2;
console.log(findLastIndex(arr2, f2)); // 3
console.log(findIndex(arr2, f2)); // 1
console.log('%c---------------->', 'color: red;');

/**
 * 生成顺/倒序指向函数（在一个循环中实现顺序和倒叙地遍历）
 * @param dir 1：顺序，-1：倒序
 * @returns 顺/倒序指向函数
 */
function createIndexFinder(dir: 1 | -1) {
  return function indexFinder(
    arr: any[],
    predicate: (...res: any[]) => boolean,
    context: any = window,
  ) {
    for (
      let i = dir === 1 ? 0 : arr.length - 1;
      (i >= 0 && i < arr.length);
      i += dir
    ) {
      if (predicate.call(context, arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  };
}
const findIndex2 = createIndexFinder(1);
const findLastIndex2 = createIndexFinder(-1);
console.log(findIndex2(arr2, f2)); // 1
console.log(findLastIndex2(arr2, f2)); // 3
console.log('%c---------------->', 'color: red;');

/**
 * 在一个排好序的数组中找到target对应的位置，保证插入数组后，依然保持有序的状态（通过二分法实现）
 * @param arr 排序的目标数组
 * @param target 插入目标数组的内容
 * @returns 目标内容插入的索引
 */
function sortIndex<T>(arr: T[], target: T) {
  let low = 0;
  let high = arr.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (arr[middle] > target) {
      high = middle;
    } else {
      low = middle + 1;
    }
  }
  return low;
}
console.log(sortIndex([10, 20, 30, 40, 50], 55)); // 3
console.log('%c---------------->', 'color: red;');

function cb(f: (...res: any[]) => any, context?: any) {
  if (!context) {
    return f;
  }
  return function fn(...params: any[]) {
    return f.apply(context, params);
  };
}
/**
 * sortIndex优化处理，通过回调函数进行优化
 * @param arr 排序的目标数组
 * @param target 插入目标数组的内容
 * @param predicate 增加通用性定义的回调函数
 * @param context 回调函数this指向
 * @returns 目标内容插入索引
 */
function sortIndex2<T>(
  arr: T[],
  target: T,
  predicate: (item: T, index: number, array: T[]) => any,
  context: any = window,
) {
  let low = 0;
  let high = arr.length;
  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    const f = cb(predicate, context);
    if (f(arr[middle]) > f(target)) {
      high = middle;
    } else {
      low = middle + 1;
    }
  }
  return low;
}
const stooges = [{ name: 'stooge1', age: 10 }, { name: 'stooge2', age: 30 }];
const result = sortIndex2(stooges, { name: 'stooge3', age: 20 }, (stooge) => stooge.age);
console.log(result); // 1
console.log('%c---------------->', 'color: red;');

/**
 * 生成顺/倒序指向函数（在一个循环中实现顺序和倒叙）
 * @param dir 1：顺序，-1：倒叙
 * @returns 顺/倒序指向函数
 */
function createIndexOfFinder(dir: 1 | -1) {
  return function indexOfFinder<T>(
    arr: T[],
    target: T,
  ) {
    for (
      let i = dir === 1 ? 0 : arr.length - 1;
      (i >= 0 && i < arr.length);
      i += 1
    ) {
      if (arr[i] === target) {
        return i;
      }
    }
    return -1;
  };
}
const arr3 = [2, 1, 3, 4, 2];
const indexOf = createIndexOfFinder(1);
const lastIndexOf = createIndexOfFinder(-1);
console.log(indexOf(arr3, 2)); // 0
console.log(lastIndexOf(arr3, 2)); // 4
console.log('%c---------------->', 'color: red;');

/**
 * 生成顺/倒序指向函数（可以传递fromIndex指定查找的起始位置）
 * @param dir 1：顺序，-1：倒叙
 * @returns 顺/倒序指向函数
 */
function createIndexOfFinder2(dir: 1 | -1) {
  return function indexOfFinder2<T>(
    arr: T[],
    target: T,
    from: number = dir === 1 ? 0 : arr.length,
  ) {
    let start = 0;
    let end = arr.length - 1;
    if (dir === 1) {
      start = from >= 0 ? from : Math.max(arr.length + from, 0);
    } else {
      end = from >= 0 ? Math.min(from, arr.length) : from + arr.length;
    }
    let i = dir === 1 ? start : end;
    for (; i >= 0 && i <= arr.length; i += dir) {
      if (arr[i] === target) {
        return i;
      }
    }
    return -1;
  };
}
const arr4 = [5, 4, 3, 4, 5];
const indexOf2 = createIndexOfFinder2(1);
console.log(indexOf2(arr4, 5, -5)); // 0
console.log(indexOf2(arr4, 5, 4)); // 4
const lastIndexOf2 = createIndexOfFinder2(-1);
console.log(lastIndexOf2(arr4, 5, -1)); // 4
console.log('%c---------------->', 'color: red;');

/**
 * 生成顺/倒序指向函数的优化
 * @param dir 1：顺序，-1：倒叙
 * @param predicate NaN优化
 * @param sort 有序数组优化
 * @returns 索引值
 */
function createIndexOfFinder3(
  dir: 1 | -1,
  predicate?: <T>(arr: T[], f: (item: T) => boolean, context: any) => number,
  sort?: <T>(arr: T[], target: T) => number,
) {
  return function indexOfFinder3<T>(
    arr: T[],
    target: T,
    from: number | boolean = dir === 1 ? 0 : arr.length,
  ) {
    let start = 0;
    let end = arr.length;
    if (typeof from === 'number') {
      if (dir === 1) {
        start = from >= 0 ? from : Math.max(arr.length + from, 0);
      } else {
        end = from >= 0 ? Math.min(from, arr.length) : arr.length + from;
      }
    } else if (sort && from && arr.length) {
      // 对于有序的数组采用更快的二分法
      const idx = sort(arr, target);
      return arr[idx - 1] === target ? idx - 1 : -1;
    }
    // eslint-disable-next-line no-self-compare
    if (target !== target && predicate) {
      const idx = predicate(arr.slice(start, end), Number.isNaN, null);
      return idx >= 0 ? start + idx : -1;
    }
    let i = dir === 1 ? start : end;
    for (; i >= 0 && i <= arr.length; i += dir) {
      if (arr[i] === target) {
        return i;
      }
    }
    return -1;
  };
}
const arr5 = [1, 2, 3, 2, 1];
const arr6 = [1, NaN, 2, NaN, 1];
const arr7 = [10, 20, 30, 40];
const indexOf3 = createIndexOfFinder3(1);
console.log(indexOf3(arr5, 1)); // 0
console.log(indexOf3(arr5, 1, 1)); // 4
console.log(indexOf3(arr5, 1, -1)); // 4
console.log(indexOf3(arr5, 1, -20)); // 0
const lastIndexOf3 = createIndexOfFinder3(-1);
console.log('%c---------------->', 'color: red;');

console.log(lastIndexOf3(arr5, 1)); // 4
console.log(lastIndexOf3(arr5, 1, 1)); // 0
console.log(lastIndexOf3(arr5, 1, -1)); // 4
console.log(lastIndexOf3(arr5, 1, -10)); // -1
console.log('%c---------------->', 'color: red;');

const indexOf4 = createIndexOfFinder3(1, findIndex);
const lastIndexOf4 = createIndexOfFinder3(-1, findLastIndex);
console.log(indexOf4(arr6, NaN)); // 1
console.log(lastIndexOf4(arr6, NaN)); // 3
console.log('%c---------------->', 'color: red;');

const indexOf5 = createIndexOfFinder3(1, findIndex, sortIndex);
console.log(indexOf5(arr7, 40, true));
export {};
