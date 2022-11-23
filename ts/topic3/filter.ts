/* eslint-disable no-new-wrappers */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
interface F {
  (...res: any[]): any,
}
interface O {
  [Key: string]: any;
}

const arr1 = [1, 1, '1', '1'];

/**
 * 双层for循环去重
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique1(arr: any[]) {
  const res: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    let j = 0;
    for (; j < res.length; j += 1) {
      if (arr[i] === res[j]) {
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

const arr2 = [1, 1, '1'];

/**
 * for循环+indexOf去重
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

const arr3 = [1, 1, '1'];

/**
 * 排序后去重，只能处理一部分数组（兼容性差但效率更高）
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique3(arr: any[]) {
  const _arr = arr.concat().sort();
  const res: any[] = [];
  let prev: any;
  for (let i = 0; i < _arr.length; i += 1) {
    const val = _arr[i];
    if (!i || val !== prev) {
      res.push(val);
    }
    prev = val;
  }
  return res;
}
console.log(unique3(arr3)); // [1, '1']

// 根据一个参数 isSorted 判断传入的数组是否是已排序的，
// 如果为 true，我们就判断相邻元素是否相同，如果为 false，
// 我们就使用 indexOf 进行判断

const arr4 = [1, 2, '1', 2, 1];
const arr5 = [1, 1, '1', 2, 2];

/**
 * 实现unquie函数，根据是否已排序进行去重操作
 * @param arr 目标数组
 * @param isSorted 目标数组是否已排序
 * @returns 去重后的数组
 */
function unique4(arr: any[], isSorted = false) {
  const res: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (isSorted) {
      if (!i || val !== arr[i - 1]) {
        res.push(val);
      }
    } else if (res.indexOf(val) === -1) {
      res.push(val);
    }
  }
  return res;
}

console.log(unique4(arr4)); // [1, 2, '1']
console.log(unique4(arr5, true)); // [1, '1', 2]

const arr6 = [1, 1, 'a', 'A', 2, 2];

/**
 * 在unquie4函数的基础上进行优化，通过iterator迭代函数优化处理
 * @param arr 目标数组
 * @param isSorted 目标数组是否已排序
 * @param iterator 迭代函数
 * @returns 去重后的数组
 */
function unique5(arr: any[], isSorted: boolean, iterator: F) {
  const res: any[] = [];
  const iteratorRes: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    const val = iterator ? iterator(arr[i]) : arr[i];
    if (isSorted) {
      if (!i || val !== (iterator ? iterator(arr[i - 1]) : arr[i - 1])) {
        res.push(arr[i]);
        iteratorRes.push(val);
      }
    } else if (iteratorRes.indexOf(val) === -1) {
      res.push(arr[i]);
      iteratorRes.push(val);
    }
  }
  return res;
}

console.log(unique5(
  arr6,
  false,
  (v: string | number) => ((typeof v === 'string') ? v.toLowerCase() : v),
)); // [1, 'a', 2]

const arr7 = [1, 2, 1, 1, '1'];

/**
 * 通过filter简化外层循环
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique6(arr: any[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

console.log(unique6(arr7)); // [1, 2, '1']

const arr8 = [1, 2, 1, 1, '1'];

/**
 * 对于已排序数组外层循环使用filter进行简化
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique7(arr: any[]) {
  return arr
    .concat()
    .sort()
    .filter((item, index, target) => (!index || item !== target[index - 1]));
}

console.log(unique7(arr8)); // [1, 2, '1']

const arr9 = [1, 2, 1, 1, '1'];
const arr10 = [{ value: 1 }, { value: 1 }, { value: '1' }];

/**
 * 通过空对象存储key来实现去重，且可以实现对象去重（正则除外，因为JSON.stringify(/a/) = '{}'）
 * @param arr 目标数组
 * @returns 去重后的数组
 */
function unique8(arr: any[]) {
  const obj: O = {};
  return arr.filter((item) => {
    const key = `${typeof item}${JSON.stringify(item)}`;
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
    obj[key] = true;
    return true;
  });
}

console.log(unique8(arr9)); // [1, 2, '1']
console.log(unique8(arr10));

const arr11 = [1, 2, 1, 1, '1'];

/**
 * 通过Set实现去重
 * @param arr 目标数组
 * @returns 去重后的数组
 */
const unique9 = (arr: any[]) => [...new Set(arr)];
console.log(unique9(arr11));

const arr12 = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];

console.log('for循环', unique1(arr12));
console.log('indexOf', unique2(arr12));
console.log('sort', unique3(arr12));
console.log('filter+indexOf', unique6(arr12)); // NaN被忽略
console.log('filter+sort', unique7(arr12));
console.log('object', unique8(arr12)); // 全部去重
console.log('es6', unique9(arr12)); // 对象不去重，NaN去重

export {};
