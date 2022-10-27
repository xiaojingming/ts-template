/* eslint-disable no-unused-vars */
interface F<T> {
  (ele: T, index: number, arr: T[]): boolean;
}
interface Fn {
  (...res: any[]): any;
}

const arr1 = [12, 5, 8, 130, 5, 44];
const fn: F<number> = (el) => el === 5;

/**
 * 实现findIndex方法
 * @param arr 输入数组
 * @param callback 回调函数
 * @param context 执行回调函数时的this指向
 * @returns 索引值或-1
 */
function findIndex<T>(
  arr: T[],
  callback: F<T>,
  context: any = null,
) {
  for (let i = 0; i < arr.length; i += 1) {
    if (callback.call(context, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}

console.log(findIndex(arr1, fn)); // 1

/**
 * 实现findLastIndex方法
 * @param arr 输入数组
 * @param callback 回到函数
 * @param context 指向回调函数时的this指向
 * @returns 索引值或-1
 */
function findLastIndex<T>(
  arr: T[],
  callback: F<T>,
  context: any = null,
) {
  for (let i = arr.length - 1; i >= 0; i -= 1) {
    if (callback.call(context, arr[i], i, arr)) {
      return i;
    }
  }
  return -1;
}
console.log(findLastIndex(arr1, fn)); // 4

/**
 * 通过传参不同，返回不同的查找函数并简化逻辑
 * @param dir 1：顺序、-1：倒叙
 * @returns 生成对应的查找函数
 */
function createIndexFinder(dir: 1 | -1) {
  return function indexFinder<T>(
    arr: T[],
    callback: F<T>,
    context: any = null,
  ) {
    let i = dir === 1 ? 0 : arr.length - 1;
    for (; i >= 0 && i < arr.length; i += dir) {
      if (callback.call(context, arr[i], i, arr)) {
        return i;
      }
    }
    return -1;
  };
}
const indexFind = createIndexFinder(1);
const lastIndexFind = createIndexFinder(-1);
console.log(indexFind(arr1, fn)); // 1
console.log(lastIndexFind(arr1, fn)); // 4
console.log('%c---------------->', 'color: red;');

const arr2 = [10, 20, 30];
/**
 * 在一个排好序的数组中找到val对应的位置，保证插入数组后，依然保持有序的状态。
 * @param arr 排好序的数组
 * @param val 插入元素
 * @returns 插入元素的具体位置
 */
function sortIndex(arr: number[], val: number) {
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
console.log(sortIndex(arr2, 15)); // 1

const arr3 = [
  { name: 'stooge1', age: 10 },
  { name: 'stooge2', age: 30 },
];
/**
 * sortIndex函数的优化，增加其通用性
 * @param arr 排好序的数组，注意不一定是严格意义上的排好序，数组中每一个可以是引用类型，而这每一项的某个属性按顺序排列
 * @param val 插入的元素（可能是引用类型）
 * @param callback 回调函数，用于获取引用类型中的某一项
 * @param context 执行回调函数的this指向
 * @returns 插入元素的具体位置
 */
function sortIndex2<T>(
  arr: T[],
  val: T,
  callback: (v: T) => number,
  context?: any,
) {
  let high = arr.length;
  let low = 0;
  let iteratee = function f(foo: Fn, ctx?: any) {
    if (!ctx) {
      return foo;
    }
    return function cb(...params: any[]) {
      foo.apply(ctx, params);
    };
  };
  iteratee = iteratee(callback, context);
  while (high > low) {
    const mid = Math.floor((high + low) / 2);
    if ((iteratee as Fn)(arr[mid]) > (iteratee as Fn)(val)) {
      high = mid;
    } else {
      low = mid + 1;
    }
  }
  return low;
}
console.log(sortIndex2(arr3, { name: 'stooge3', age: 10 }, (v) => v.age)); // 1
console.log('%c---------------->', 'color: red;');

function createIndexOfFinder(dir: 1 | -1) {
  return function indexOfFinder<T>(arr: T[], val: T) {
    let i = dir === 1 ? 0 : arr.length - 1;
    for (; i >= 0 && i < arr.length; i += dir) {
      if (arr[i] === val) {
        return i;
      }
    }
    return -1;
  };
}
const arr4 = [1, 2, 3, 2, 1];
const indexOfFind = createIndexOfFinder(1);
const lastIndexOfFind = createIndexOfFinder(-1);
console.log(indexOfFind(arr4, 1)); // 0
console.log(lastIndexOfFind(arr4, 1)); // 4
console.log('%c---------------->', 'color: red;');

const arr5 = [1, 2, 3, 2, 1];
/**
 * 生成顺/倒序指向函数（生成的函数可以传递index指定开始查找的位置）
 * @param dir 顺序或倒叙
 * @returns 顺序/倒叙指向函数
 */
function createIndexOfFinder2(dir: 1 | -1) {
  return function indexOfFinder2<T>(
    arr: T[],
    val: T,
    index = dir === 1 ? 0 : arr.length - 1,
  ) {
    let start = 0;
    let end = arr.length - 1;
    if (dir === 1) {
      start = index >= 0 ? index : Math.max(0, index + arr.length);
    } else {
      end = index >= 0 ? Math.min(index, arr.length - 1) : index + arr.length;
    }
    let i = dir === 1 ? start : end;
    for (; i >= 0 && i <= arr.length - 1; i += dir) {
      if (arr[i] === val) {
        return i;
      }
    }
    return -1;
  };
}
const indexFind2 = createIndexOfFinder2(1);
const lastIndexFind2 = createIndexOfFinder2(-1);
console.log(indexFind2(arr5, 1, -5)); // 0
console.log(lastIndexFind2(arr5, 1, 3)); // 0
console.log('%c---------------->', 'color: red;');

/**
 * 生成顺/倒序指向函数（生成的函数可以传递index指定开始查找的位置，优化了支持NaN的查找以及对于排序数组使用更快的二分法）
 * @param dir 顺/倒序
 * @param predicate findIndex函数，用于查找NaN，非必填
 * @param sortFn sortIndex函数，用于对已排序数组使用更快的二分法
 * @returns 顺/倒序指向函数
 */
function createIndexOfFinder3(
  dir: 1 | -1,
  predicate?: typeof findIndex,
  sortFn?: typeof sortIndex,
) {
  return function indexOfFinder2<T>(
    arr: T[],
    val: T,
    index: boolean | Number = dir === 1 ? 0 : arr.length - 1,
  ) {
    let start = 0;
    let end = arr.length - 1;
    if (typeof index === 'number') {
      if (dir === 1) {
        start = index >= 0 ? index : Math.max(0, index + arr.length);
      } else {
        end = index >= 0 ? Math.min(index, arr.length - 1) : index + arr.length;
      }
    } else if (typeof index === 'boolean' && index && arr.length && sortFn) {
      // 对于有序数组，使用更快的二分法进行查找
      const i = sortFn((arr as number[]), (val as number));
      return arr[i - 1] === val ? i - 1 : -1;
    }
    // 优化：能过处理NaN的情况
    // eslint-disable-next-line no-self-compare
    if (val !== val && predicate) {
      const idx = predicate(arr.slice(start, end), Number.isNaN);
      return idx >= 0 ? start + idx : -1;
    }
    let i = dir === 1 ? start : end;
    for (; i >= 0 && i <= arr.length - 1; i += dir) {
      if (arr[i] === val) {
        return i;
      }
    }
    return -1;
  };
}
const arr6 = [1, NaN, 5, NaN, 3];
const arr7 = [10, 20, 30, 40, 50];
const indexFind3 = createIndexOfFinder3(1, findIndex);
console.log(indexFind3(arr6, NaN, 3)); // 3
const indexFind4 = createIndexOfFinder3(1, undefined, sortIndex);
console.log(indexFind4(arr7, 10, true)); // 0

export {};
