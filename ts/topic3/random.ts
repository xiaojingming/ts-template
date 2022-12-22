/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const num = 100000;
const res1: any[] = [0, 0, 0, 0, 0];

for (let i = 0; i < num; i += 1) {
  const arr1 = [1, 2, 3, 4, 5];
  const res = arr1.sort(() => Math.random() - 0.5);
  res1[res[res.length - 1] - 1] += 1;
}
console.log(res1);

function insertionSort(
  arr: any[],
  from: number,
  to: number,
  comparefn: (...res: any[]) => any,
) {
  for (let i = from + 1; i < to; i += 1) {
    const val = arr[i];
    let j = i - 1;
    for (; j >= from; j -= 1) {
      const tmp = arr[j];
      const order = comparefn(tmp, val);
      if (order > 0) {
        arr[j + 1] = tmp;
      } else {
        break;
      }
    }
    arr[j + 1] = val;
  }
}

const obj: { [K: string]: any } = {};

// for (let i = 0; i < num; i += 1) {
//   const arr1 = [1, 2, 3];
//   const res = arr1.sort(() => Math.random() - 0.5);
//   const key = `[${res}]`;
//   if (key in obj) {
//     obj[key] += 1;
//   } else {
//     obj[key] = 1;
//   }
// }

function shuffle(arr: any[]) {
  for (let i = 0; i < arr.length; i += 1) {
    const index = Math.floor((Math.random() * (i + 1)));
    [arr[index], arr[i]] = [arr[i], arr[index]];
  }
  return arr;
}

for (let i = 0; i < num; i += 1) {
  const arr1 = [1, 2, 3];
  const res = shuffle(arr1);
  const key = `[${res}]`;
  if (key in obj) {
    obj[key] += 1;
  } else {
    obj[key] = 1;
  }
}
Object.keys(obj).forEach((key) => {
  obj[key] = `${(obj[key] * 100) / num}%`;
});
console.log(obj);
export {};
