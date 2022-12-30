/* eslint-disable no-unused-vars */
const arr1 = [1, 1, '1', '1'];
/**
 * 双重for循环实现数组去重（兼容性好）
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique1(arr: any[]) {
  const res: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    let j = 0;
    for (; j < res.length; j += 1) {
      if (res[j] === arr[i]) {
        break;
      }
    }
    if (j === res.length) {
      res.push(arr[i]);
    }
  }
  return res;
}
console.log(unique1(arr1)); // [1, '1']
console.log('%c---------------->', 'color: red;');

const arr2 = [1, 1, '1'];
/**
 * for循环+indexOf简化内层循环实现数组去重（indexOf底层使用"==="）
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique2(arr: any[]) {
  const res: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (res.indexOf(val) === -1) {
      res.push(val);
    }
  }
  return res;
}
console.log(unique2(arr2)); // [1, '1']
console.log('%c---------------->', 'color: red;');

const arr3 = [1, 1, '1', 2, '2', '2'];
/**
 * 对数组排序后进行去重（只能处理特殊数组）
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique3(arr: any[]) {
  const $arr = arr.concat().sort();
  const res: any[] = [];
  for (let i = 0; i < $arr.length; i += 1) {
    const val = $arr[i];
    if (!i || val !== $arr[i - 1]) {
      res.push(val);
    }
  }
  return res;
}
console.log(unique3(arr3)); // [1, '1', 2, '2']
console.log('%c---------------->', 'color: red;');

const arr4 = [1, 2, '1', 2, 1];
const arr5 = [1, 1, '1', 2, 2];

/**
 * 数组去重，并且已排序数组使用更快地方式去重
 * @param arr 目标数组
 * @param sorted 是否已排序
 * @returns 去重后的数组
 */
function unique4(arr: any[], sorted = false) {
  const res: any[] = [];
  let prev: any;
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (sorted && (!i || val !== prev)) {
      res.push(val);
    } else if (res.indexOf(val) === -1) {
      res.push(val);
    }
    prev = val;
  }
  return res;
}
console.log(unique4(arr4)); // [1, 2, '1']
console.log(unique4(arr5, true)); // [1, '1', 2]
console.log('%c---------------->', 'color: red;');

const arr6 = [1, 1, 'a', 'A', 2, 2];
/**
 * 通过回调优化unique4去重函数
 * @param arr 目标数组
 * @param sorted 是否已排序
 * @param iterator 回调函数，用于优化去重
 * @returns 去重后的数组
 */
function unique6<T>(
  arr: T[],
  sorted: boolean,
  iterator?: (...res: T[]) => string,
) {
  const res: any[] = [];
  const $res: any[] = [];
  let prev: any;
  for (let i = 0; i < arr.length; i += 1) {
    const val = iterator ? iterator(arr[i]) : arr[i];
    if ((sorted && (!i || val !== prev)) || ($res.indexOf(val) === -1)) {
      res.push(arr[i]);
      $res.push(val);
      if (sorted) {
        prev = val;
      }
    }
  }
  return res;
}
console.log(unique6(arr6, false, (v) => String(v).toLowerCase())); // [1, "a", 2]
console.log('%c---------------->', 'color: red;');

const arr7 = [1, 2, 1, 1, '1'];
/**
 * 通过filter简化外层循环+indexOf
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique7(arr: any[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
console.log(unique7(arr7)); // [1, 2, '1']
console.log('%c---------------->', 'color: red;');

const arr8 = [1, 2, 1, 1, '1'];
/**
 * 排序数组filter简化外层循环+indexOf
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique8(arr: any[]) {
  return arr.concat().sort().filter((item, index, array) => !index || item !== array[index - 1]);
}
console.log(unique8(arr8)); // [1, 2, '1']
console.log('%c---------------->', 'color: red;');

const arr9 = [{ value: 1 }, { value: 1 }, { value: 2 }];
/**
 * 通过键值对来进行存储（不能处理正则，JSON.stringify(/a/) = '{}'）
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique9(arr: any[]) {
  const obj: { [K: string]: any } = {};
  return arr.filter((item) => {
    const key = typeof item + JSON.stringify(item);
    if (!Reflect.has(obj, key)) {
      Reflect.set(obj, key, true);
      return true;
    }
    return false;
  });
}
console.log(unique9(arr9)); // [{ value: 1 }, { value: 2 }];
console.log('%c---------------->', 'color: red;');

const unique = (arr: any[]) => [...new Set(arr)];
// eslint-disable-next-line no-new-wrappers
const arr = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];
console.log(unique1(arr));
console.log(unique2(arr));
console.log(unique3(arr));
console.log(unique7(arr));
console.log(unique8(arr));
console.log(unique9(arr));
console.log(unique(arr));

export {};
