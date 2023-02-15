const arr1 = [1, 3, 3, 4];
/**
 * findIndex函数的实现
 * @param arr 输入数组
 * @param cb 目标元素执行的回调函数
 * @param context 回调函数this指向
 * @returns 满足回调函数的元素的索引值或-1
 */
function findIndex1<T>(
  arr: T[],
  cb: (item: T, i: number, array: T[]) => boolean,
  context: any = null,
) {
  for (let i = 0; i < arr.length; i += 1) {
    if (cb.call(context, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

console.log(findIndex1(arr1, (n) => n === 3)); // 1
console.log('%c---------------->', 'color: red;');

const arr2 = [1, 3, 3, 4];
/**
 * findLastIndex函数的实现
 * @param arr 输入数组
 * @param cb 目标元素执行的回调函数
 * @param context 回调函数this指向
 * @returns 满足回调函数的元素的索引值或-1
 */
function findLastIndex1<T>(
  arr: T[],
  cb: (item: T, i: number, array: T[]) => boolean,
  context: any = null,
) {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (cb.call(context, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}
console.log(findLastIndex1(arr2, (n) => n === 3)); // 2
console.log('%c---------------->', 'color: red;');

/**
 * findIndex、findLastIndex函数的工厂函数
 * @param dir 1：顺序，-1：倒叙
 * @returns 返回对应的findIndex或者findLastIndex函数
 */
function createIndexFinder(dir: 1 | -1) {
  return function indexFinder<T>(
    arr: T[],
    cb: (item: T, i: number, array: T[]) => boolean,
    context: any = null,
  ) {
    let i = dir === 1 ? 0 : arr.length - 1;
    for (; i < arr.length && i >= 0; i += dir) {
      if (cb.call(context, arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  };
}

const arr3 = [1, 2, 3, 2, 1];
const findIndex2 = createIndexFinder(1);
const lastIndex2 = createIndexFinder(-1);
const fn = (n: number) => (n === 1);
console.log(findIndex2(arr3, fn)); // 0
console.log(lastIndex2(arr3, fn)); // 4
console.log('%c---------------->', 'color: red;');

const arr4 = [10, 20, 30];

/**
 * 在一个排好序的数组中找到 value 对应的位置，保证插入数组后，依然保持有序的状态。
 * @param arr 已排序数组
 * @param i 插入元素
 * @returns 插入元素在已排序数组中的位置
 */
function sortIndex(arr: number[], i: number) {
  let high = arr.length;
  let low = 0;
  while (high > low) {
    const mid = Math.floor((high + low) / 2);
    if (arr[mid] >= i) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return high;
}

console.log(sortIndex(arr4, 25)); // 2;
console.log('%c---------------->', 'color: red;');

const stooges = [
  { name: 'stooge1', age: 10 },
  { name: 'stooge2', age: 30 },
];

/**
 * sortIndex函数的优化，支持通过回调函数优化插入的元素为对象
 * @param arr 按照一定规则排序的数组
 * @param item 插入元素、对象
 * @param cb 插入元素、对象执行的回调函数
 * @param context 执行回调函数的this指向
 * @returns 插入元素、对象在已排序数组中的位置
 */
function sortIndex2<T>(
  arr: T[],
  item: T,
  cb: (v: T) => number,
  context: any = null,
) {
  let high = arr.length;
  let low = 0;
  while (high > low) {
    const mid = Math.floor((high + low) / 2);
    if (cb.call(context, arr[mid]) >= cb.call(context, item)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return high;
}

console.log(sortIndex2(stooges, {
  name: 'stooge3',
  age: 20,
}, (v) => v.age)); // 1
console.log('%c---------------->', 'color: red;');

const arr5 = [1, 2, 3, 4, 5];

/**
 * indexOf和lastIndexOf函数的工厂函数
 * @param dir 1：顺序，-1：倒叙
 * @returns 返回对应的indexOf和lastIndexOf函数
 */
function createIndexOfFinder(dir: 1 | -1) {
  return function indexOfFinder(arr: number[], v: number) {
    let i = dir === 1 ? 0 : arr.length - 1;
    for (; i < arr.length && i >= 0; i += dir) {
      if (arr[i] === v) {
        return i;
      }
    }
    return -1;
  };
}

const indexOf1 = createIndexOfFinder(1);
const lastIndexOf1 = createIndexOfFinder(-1);
console.log(indexOf1(arr5, 2)); // 1
console.log(lastIndexOf1(arr5, 2)); // 1
console.log('%c---------------->', 'color: red;');

/**
 * createIndexOfFinder工厂函数的优化，支持增加formIndex查找索引和查找NaN以及对有序数组使用二分法进行查找
 * @param dir 1：顺序，-1：倒叙
 * @param predicate 查找NaN时传递前面实现的findIndex函数
 * @param sortPredicate 二分法时传递的sortIndex函数
 * @returns 返回对应的indexOf和lastIndexOf函数
 */
function createIndexOfFinder2<T>(
  dir: 1 | -1,
  predicate?: (arr: T[], cb: (item: T, i: number, array: T[]) => boolean) => number,
  sortPredicate?: (arr: number[], i: number) => number,
) {
  return function indexOfFinder(
    arr: T[],
    v: T,
    from: number | boolean = dir === 1 ? 0 : arr.length - 1,
  ) {
    let end = arr.length - 1;
    let start = 0;
    if (typeof from === 'number') {
      if (dir === 1) {
        start = from >= 0 ? from : Math.max(0, arr.length + from);
      } else {
        end = from >= 0 ? Math.min(arr.length - 1, from) : arr.length + from;
      }
    } else if (sortPredicate && from && end) {
      // 有序数组使用更快的二分法
      const idx = sortPredicate((arr as number[]), v as number);
      return arr[idx] === v ? idx : -1;
    }
    // 支持NaN的查找
    // eslint-disable-next-line no-self-compare
    if (v !== v && predicate) {
      const idx = predicate(arr.slice(start, end + 1), Number.isNaN);
      return idx === -1 ? -1 : start + idx;
    }
    let i = dir === 1 ? start : end;
    for (;i >= 0 && i < arr.length; i += dir) {
      if (arr[i] === v) {
        return i;
      }
    }
    return -1;
  };
}

const arr6 = [1, 2, 3, 2, 1];
const arr7 = [1, NaN, NaN, 1];
const arr8 = [1, 2, 3, 4, 5];

const indexOf2 = createIndexOfFinder2(1);
const lastIndexOf2 = createIndexOfFinder2(-1);
console.log(indexOf2(arr6, 1, 1)); // 4
console.log(lastIndexOf2(arr6, 1, 1)); // 0
console.log('%c---------------->', 'color: red;');

const indexOf3 = createIndexOfFinder2(1, findIndex1);
const lastIndexOf3 = createIndexOfFinder2(-1, findLastIndex1);
console.log(indexOf3(arr7, NaN, 2)); // 2
console.log(lastIndexOf3(arr7, NaN)); // 2
console.log('%c---------------->', 'color: red;');

const indexOf4 = createIndexOfFinder2(1, undefined, sortIndex);
console.log(indexOf4(arr8, 3, true)); // 2

export {};
