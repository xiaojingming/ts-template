/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const arr1 = [1, [2, [3, 4]]];

/**
 * 通过for循环实现多维数组扁平化
 * @param arr 多维数组
 * @returns 一维数组
 */
function flatten1(arr: any[]) {
  let result: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    const val = arr[i];
    if (Array.isArray(val)) {
      result = result.concat(flatten1(val));
    } else {
      result.push(val);
    }
  }
  return result;
}

console.log(flatten1(arr1)); // [1, 2, 3, 4]
console.log('%c---------------->', 'color: red;');

const arr2 = [1, [2, [3, 4]]];

/**
 * 通过toString实现多维数组扁平化（只能处理每一维度中的元素都是number类型）
 * @param arr 多维数组，且每一维度的数组中的子项都属number类型
 * @returns 一维数组
 */
function flatten2(arr: any[]) {
  return arr.toString().split(',').map((item) => Number(item));
}
console.log(flatten2(arr2)); // [1, 2, 3, 4]
console.log('%c---------------->', 'color: red;');

const arr3 = [1, [2, [3, 4]]];

/**
 * 通过reduce实现多维数组扁平化
 * @param arr 多维数组
 * @returns 一维数组
 */
function flatten3(arr: any[]) {
  return arr.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      prev = prev.concat(flatten3(cur));
    } else {
      prev.push(cur);
    }
    return prev;
  }, []);
}
console.log(flatten3(arr3)); // [1, 2, 3, 4]
console.log('%c---------------->', 'color: red;');

const arr4 = [1, [2, [3, 4]]];

/**
 * 通过while和扩展运算符实现多维数组扁平化
 * @param arr 多维数组
 * @returns 一维数组
 */
function flatten4(arr: any[]) {
  while (arr.some(Array.isArray)) {
    arr = [].concat(...arr);
  }
  return arr;
}

console.log(flatten4(arr4)); // [1, 2, 3, 4]
console.log('%c---------------->', 'color: red;');

const arr5 = [1, [2, [3, 4]]];
// const arr5 = [1, [2, [3, 4]], [5, [6, [7]]], 8, [[9], 10]];

/**
 * 通用数组扁平化函数
 * @param input 要处理的数组
 * @param shallow 是否只扁平一层
 * @param strict 是否严格处理元素
 * @param output 方便递归传递的参数
 * @returns 扁平化后的数组
 */
function flatten(
  input: any[],
  shallow: boolean,
  strict: boolean,
  output: any[] = [],
) {
  let index = output.length;
  for (let i = 0; i < input.length; i += 1) {
    const val = input[i];
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

console.log(flatten(arr5, true, true));
console.log(flatten(arr5, true, false));
console.log(flatten(arr5, false, true));
console.log(flatten(arr5, false, false));
console.log('%c---------------->', 'color: red;');

function union(...res: any[]) {
  return [...new Set(flatten(res, true, true))];
}

console.log(union([1, 2, 3], [101, 2, 1, 10], [2, 1], 4, 5)); // [1, 2, 3, 101, 10]
console.log('%c---------------->', 'color: red;');

function difference(...res: any[]) {
  const target = res[0];
  const params = res.slice(1);
  return target.filter((item: number) => !flatten(params, true, true).includes(item));
}

console.log(difference([1, 2, 3, 4, 5], [5, 2, 10], [4], 3)); // [1, 3]

export {};
