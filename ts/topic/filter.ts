/* eslint-disable no-new-wrappers */
/* eslint-disable no-unused-vars */
const arr1 = [1, 1, '1', '1'];

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

const arr2 = [1, '1', '1'];
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
console.log(unique2(arr2));

const arr3 = [1, '1', '1'];
function unique3(arr: any[]) {
  const res: any[] = [];
  for (let i = 0; i < arr.length; i += 1) {
    if (!i || arr[i] !== arr[i - 1]) {
      res.push(arr[i]);
    }
  }
  return res;
}
console.log(unique3(arr3));

const arr4 = [1, 2, '1', 2, 1];
const arr5 = [1, 1, '1', 2, 2];
function unique4(arr: any[], isSorted: boolean) {
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
console.log(unique4(arr4, false));
console.log(unique4(arr5, true));

const arr6 = [1, 1, 'a', 'A', 2, 2];
function unqiue5(
  arr: any[],
  isSorted: Boolean,
  iteratee: (...res: any[]) => any,
) {
  const res: any[] = [];
  const formatRes: Array<ReturnType<typeof iteratee>> = [];
  for (let i = 0; i < arr.length; i += 1) {
    const val = iteratee ? iteratee(arr[i]) : arr[i];
    if (isSorted) {
      if (!i || (val !== iteratee ? iteratee(arr[i - 1]) : arr[i - 1])) {
        res.push(arr[i]);
      }
    } else if (formatRes.indexOf(val) === -1) {
      formatRes.push(val);
      res.push(arr[i]);
    }
  }
  return res;
}
console.log(unqiue5(
  arr6,
  false,
  (item: typeof arr6[number]) => (typeof item === 'string'
    ? item.toUpperCase() : item),
));

const arr7 = [1, 2, 1, 1, '1'];
function unqiue6(arr: any[]) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}
console.log(unqiue6(arr7));

const arr8 = [1, 1, 1, '1', 2];
function unqiue7(arr: any[]) {
  return arr.filter((item, index) => !index || item !== arr[index - 1]);
}
console.log(unqiue7(arr8));

const arr9 = [{ value: 1 }, { value: 1 }, { value: 2 }];
function unique8(arr: any[]) {
  const cache: { [key: string]: boolean } = {};
  return arr.filter((item) => {
    const key = typeof item + JSON.stringify(item);
    if (Reflect.has(cache, key)) {
      return false;
    }
    Reflect.set(cache, key, true);
    return true;
  });
}
console.log(unique8(arr9));

const arr10 = [1, 2, 1, 1, '1'];
function unqiue9(arr: any[]) {
  return [...new Set(arr)];
}
console.log(unqiue9(arr10));

const array = [1, 1, '1', '1', null, null, undefined, undefined, new String('1'), new String('1'), /a/, /a/, NaN, NaN];
console.log(unique1(array));
console.log(unique2(array));
export {};
