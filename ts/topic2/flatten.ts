/* eslint-disable no-unused-vars */
interface F {
  (...res: any[]): any;
}
interface O {
  [key: string]: any;
}

const arr1 = [1, 1, '1', '1'];

/**
 * 通过双层for循环过滤数组
 * @param arr 待过滤的数组
 * @returns 过滤后的数组
 */
function unique1(arr: any[]) {
  const res: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    let j = 0;
    for (; j < res.length; j += 1) {
      if (val === res[j]) {
        break;
      }
    }
    if (j === res.length) {
      res.push(val);
    }
  }
  return res;
}

console.log(unique1(arr1)); // [1, '1']

const arr2 = [1, 1, '1'];

/**
 * 通过indexOf过滤内存数组
 * @param arr 待过滤的数组
 * @returns 过滤后的数组
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
 * 排序后去重
 * @param arr 待过滤的数组
 * @returns 过滤后的数组
 */
function unique3(arr: any[]) {
  const sortArr: any[] = arr.concat().sort();
  const res: any[] = [];
  for (let i = 0; i < sortArr.length; i += 1) {
    const val = sortArr[i];
    if (!i || val !== sortArr[i - 1]) {
      res.push(val);
    }
  }
  return res;
}

console.log(unique3(arr3)); // [1, '1']

const arr4 = [1, 2, '1', 2, 1];
const arr5 = [1, 1, '1', 2, 2];

/**
 * 通用unique函数
 * @param arr 待过滤数组
 * @param isSorted 数组是否排序
 * @returns 过滤后的数组
 */
function unique4(arr: any[], isSorted = false) {
  const res: any[] = [];
  let prev: any | null;
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (isSorted && (!i || val !== prev)) {
      res.push(val);
      prev = val;
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
 * unique函数的优化，通过回调函数进一步过滤数据
 * @param arr 待过滤的数组
 * @param isSorted 是否排序
 * @param iterator 回调函数
 * @returns 过滤后的数组
 */
function unique6(arr: any[], isSorted: boolean, iterator?: F) {
  const res: any[] = [];
  const iterRes: any[] = [];
  let prev: any | null;
  for (let i = 0; i < arr.length; i += 1) {
    const val: any = iterator ? iterator(arr[i]) : arr[i];
    if (isSorted && (!i || prev !== val)) {
      res.push(arr[i]);
      prev = val;
    } else if (iterRes.indexOf(val) === -1) {
      res.push(arr[i]);
      iterRes.push(val);
    }
  }
  return res;
}

console.log(unique6(
  arr6,
  false,
  (i: any) => (typeof i === 'string' ? i.toUpperCase() : i),
)); // [1, 'a', 2]

const arr7 = [1, 2, 1, 1, '1'];

/**
 * 通过filter简化外层循环
 * @param arr 待过滤数组
 * @returns 过滤后的数组
 */
function unique7(arr: any[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

console.log(unique7(arr7)); // [1, 2, '1']

const arr8 = [1, 2, 1, 1, '1'];

/**
 * 通过filter简化排序后的数组的外层循环
 * @param arr 待过滤数组
 * @returns 过滤后的数组
 */
function unique8(arr: any[]) {
  const sortArr = arr.concat().sort();
  return sortArr.filter((item, index) => (!index || item !== sortArr[index - 1]));
}

console.log(unique8(arr8)); // [1, '1', 2]

const arr9 = [{ value: 1 }, { value: 1 }, { value: 2 }];
/**
 * 通过键值对来存储过滤数组
 * @param arr 待过滤数组
 * @returns 过滤后的数组
 */
function unique9(arr: any[]) {
  const obj: O = {};
  return arr.filter((item) => {
    const key = `${typeof item}${JSON.stringify(item)}`;
    if (Reflect.has(obj, key)) {
      return true;
    }
    Reflect.set(obj, key, true);
    return false;
  });
}
console.log(unique9(arr9)); // [{ value: 1 }]

const arr10 = [1, 2, 1, 1, '1'];

/**
 * 通过ES6简化过滤
 * @param arr 待过滤数组
 * @returns 过滤后的数组
 */
function unique10(arr: any[]) {
  return [...new Set(arr)];
}
console.log(unique10(arr10));

// eslint-disable-next-line no-new-wrappers
const arrs = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];

console.log(unique1(arrs));
console.log(unique2(arrs));
console.log(unique3(arrs));
console.log(unique7(arrs));
console.log(unique9(arrs));
console.log(unique10(arrs));

export { };
