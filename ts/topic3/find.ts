/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/**
 * 模拟实现findIndex方法
 * @param arr 目标数组
 * @param predicate 针对数组中的每个元素，都会执行该回调函数
 * @param context 可选，执行predicate时作为this对象的值
 * @returns 数组中通过提供测试函数的第一个元素的索引。否则，返回 -1
 */
function findIndex<T>(
  arr: T[],
  predicate: (v: T, i: number, arrs: T[]) => boolean,
  context: any = null,
) {
  for (let i = 0; i < arr.length; i += 1) {
    if (predicate.call(context, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

console.log(findIndex([1, 2, 3, 4], (item) => item === 3)); // 2
console.log('%c---------------->', 'color: red;');

/**
 * 模拟实现findLastIndex方法
 * @param arr 目标数组
 * @param predicate 针对数组中的每个元素，都会执行该回调函数
 * @param context 可选，执行predicate时作为this对象的值
 * @returns 数组中通过提供测试函数的第一个元素的索引。否则，返回 -1
 */
function findLastIndex<T>(
  arr: T[],
  predicate: (v: T, i: number, arrs: T[]) => boolean,
  context: any = null,
) {
  for (let i = arr.length; i >= 0; i -= 1) {
    if (predicate.call(context, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

console.log(findLastIndex([1, 2, 3, 4], (item) => item === 1)); // 0
console.log('%c---------------->', 'color: red;');

/**
 * findIndex和findLastIndex的工厂函数
 * @param dir 为1时返回findIndex函数，否则返回findLastIndex函数
 * @returns findIndex/findLastIndex函数
 */
function createIndexFinder(dir: 1 | -1) {
  return function indexFinder<T>(
    arr: T[],
    predicate: (v: T, i: number, arrs: T[]) => boolean,
    context: any = null,
  ) {
    let i = dir === 1 ? 0 : arr.length - 1;
    for (; i >= 0 && i < arr.length; i += dir) {
      if (predicate.call(context, arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  };
}

const arr1 = [1, 2, 3, 2, 1];
const findIndex1 = createIndexFinder(1);
const findLastIndex1 = createIndexFinder(-1);
console.log(findIndex1(arr1, (i) => i === 1)); // 0
console.log(findLastIndex1(arr1, (i) => i === 1)); // 4
console.log('%c---------------->', 'color: red;');

/**
 * 在一个排好序的数组中找到 value 对应的位置，保证插入数组后，依然保持有序的状态。
 * @param arr 已排序的数组
 * @param val 插入数组的元素
 * @returns 元素插入的位置
 */
function sortedIndex(arr: number[], val: number) {
  let high = arr.length;
  let low = 0;
  while (high > low) {
    const mid = Math.floor((high + low) / 2);
    if (arr[mid] > val) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}

console.log(sortedIndex([10, 20, 30], 25)); // 2

/**
 * sortedIndex函数的优化，通过predicate函数对每一个元素进行处理
 * @param arr 已排序的数组
 * @param val 插入数组的元素
 * @param predicate 处理函数
 * @param context 处理函数的this指向
 * @returns 元素插入的位置
 */
function sortedIndex2<T>(
  arr: T[],
  val: T,
  predicate: (v: T) => number,
  context: any = null,
) {
  let low = 0;
  let high = arr.length;
  function cb(fn: (...res: any[]) => any, ctx: any) {
    if (!ctx) {
      return fn;
    }
    return function f(...params: any[]) {
      return fn.apply(context, params);
    };
  }
  predicate = cb(predicate, context);
  while (high > low) {
    const mid = Math.floor((low + high) / 2);
    if (predicate(arr[mid]) > predicate(val)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}

const stooges = [
  { name: 'stooge1', age: 10 },
  { name: 'stooge2', age: 30 },
];

console.log(sortedIndex2(
  stooges,
  { name: 'stooge3', age: 20 },
  (stooge) => stooge.age,
)); // 1
console.log('%c---------------->', 'color: red;');

/**
 * indexOf和lastIndexOf的工厂函数
 * @param dir 为1时返回indexOf函数，否则返回lastIndexOf函数
 * @returns indexOf/lastIndexOf函数
 */
function createIndexOfFinder(dir: 1 | -1) {
  return function indexOfFinder<T>(arr: T[], val: T) {
    let i = dir === -1 ? arr.length - 1 : 0;
    for (; i >= 0 && i < arr.length; i += dir) {
      if (arr[i] === val) {
        return i;
      }
    }
    return -1;
  };
}

const indexOf = createIndexOfFinder(1);
const lastIndexOf = createIndexOfFinder(-1);
const arr2 = [1, 2, 3, 4, 5, 1];
console.log(indexOf(arr2, 1)); // 0
console.log(indexOf(arr2, 5)); // 4
console.log(lastIndexOf(arr2, 1)); // 5
console.log('%c---------------->', 'color: red;');

/**
 * createIndexOfFinder函数的优化，生成的indexOf和lastIndexOf函数能够使用from参数
 * @param dir 为1时返回indexOf函数，否则返回lastIndexOf函数
 * @returns indexOf/lastIndexOf函数
 */
function createIndexOfFinder2(dir: 1 | -1) {
  return function indexOfFinder<T>(
    arr: T[],
    val: T,
    from = dir === 1 ? 0 : arr.length - 1,
  ) {
    let start = 0;
    let end = arr.length - 1;
    if (dir === 1) {
      start = from >= 0 ? from : Math.max(0, arr.length + from);
    } else {
      end = from >= 0 ? Math.min(from, arr.length - 1) : arr.length + from;
    }
    let i = dir === -1 ? end : start;
    for (; i >= 0 && i < arr.length; i += dir) {
      if (arr[i] === val) {
        return i;
      }
    }
    return -1;
  };
}

const arr3 = [1, 2, 3, 2, 1, 5];
const indexOf2 = createIndexOfFinder2(1);
const lastIndexOf2 = createIndexOfFinder2(-1);
console.log(indexOf2(arr3, 1, 0)); // 0
console.log(indexOf2(arr3, 1, 1)); // 4
console.log(indexOf2(arr3, 1, 10)); // -1
console.log('%c---------------->', 'color: red;');

console.log(lastIndexOf2(arr3, 1)); // 4
console.log(lastIndexOf2(arr3, 1, 1)); // 0
console.log(lastIndexOf2(arr3, 1, 5)); // 4
console.log(lastIndexOf2(arr3, 1, -10)); // -1
console.log(lastIndexOf2(arr3, 1, -1)); // 4
console.log('%c---------------->', 'color: red;');

/**
 * createIndexOfFinder2函数的优化，在原先的基础上增加了判断NaN的功能，以及对有序数组使用更快的二分法进行查询
 * @param dir 为1时返回indexOf函数，否则返回lastIndexOf函数
 * @param predicate 用于判断NaN所传递的函数
 * @returns indexOf/lastIndexOf函数
 */
function createIndexOfFinder3(dir: 1 | -1, predicate?: (...res: any[]) => any) {
  return function indexOfFinder3<T>(
    arr: T[],
    val: T,
    fromOrIsSorted: number | boolean = dir === 1 ? 0 : arr.length - 1,
  ) {
    let start = 0;
    let end = arr.length - 1;
    if (typeof fromOrIsSorted === 'number') {
      if (dir === 1) {
        start = fromOrIsSorted >= 0 ? fromOrIsSorted : Math.max(0, arr.length + fromOrIsSorted);
      } else {
        end = fromOrIsSorted >= 0
          ? Math.min(arr.length - 1, fromOrIsSorted)
          : arr.length + fromOrIsSorted;
      }
    } else if (fromOrIsSorted) {
      // 二分法只有indexOf支持
      const idx = sortedIndex((arr as number[]), (val as number));
      return arr[idx - 1] === val ? idx - 1 : -1;
    }
    let i = dir === 1 ? start : end;
    // 处理NaN的情况
    // eslint-disable-next-line no-self-compare
    if ((val !== val) && predicate) {
      const idx = predicate(arr.slice(start, end + 1), Number.isNaN, val);
      return idx === -1 ? -1 : idx + start;
    }
    for (; i >= 0 && i < arr.length; i += dir) {
      if (arr[i] === val) {
        return i;
      }
    }
    return -1;
  };
}

// const arr = [1, NaN, 2, 3, 2, NaN, 1, 5];
const arr = [10, 20, 30, 40, 50, 60];

const indexOf3 = createIndexOfFinder3(1, findIndex);
// const lastIndexOf3 = createIndexOfFinder3(-1, findLastIndex);

// console.log(indexOf3(arr, NaN, 1)); // 1
// console.log(indexOf3(arr, NaN, 2)); // 5
// console.log(indexOf3(arr, NaN, -2)); // -1
// console.log(indexOf3(arr, NaN, -3)); // 5
// console.log(indexOf3(arr, NaN, -7)); // 1
// console.log('%c---------------->', 'color: red;');

// console.log(lastIndexOf3(arr, NaN)); // 5
// console.log(lastIndexOf3(arr, NaN, 1)); // 1
// console.log(lastIndexOf3(arr, NaN, 0)); // -1
// console.log(lastIndexOf3(arr, NaN, 4)); // 1
// console.log(lastIndexOf3(arr, NaN, 5)); // 5
// console.log(lastIndexOf3(arr, NaN, -3)); // 5
// console.log(lastIndexOf3(arr, NaN, -4)); // 1
// console.log(lastIndexOf3(arr, NaN, -7)); // 1
// console.log(lastIndexOf3(arr, NaN, -8)); // -1
// console.log('%c---------------->', 'color: red;');

console.log(indexOf3(arr, 40, true));

export {};
