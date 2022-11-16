/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
const sum = [0, 0, 0];
const num = 10000;

for (let i = 0; i < num; i += 1) {
  sum[[1, 2, 3].sort(() => Math.random() - 0.5)[2] - 1] += 1;
}
const res1 = sum.map((i) => {
  const it = `${(i * 100) / num}%`;
  return it;
});

console.log(res1);

const compareFn = () => Math.random() - 0.5;

// function insertionSort(a: number[], from: number, to: number) {
//   for (let i = from + 1; i < to; i++) {
//     const ele = a[i];
//     let j = i - 1;
//     for (; j >= from; j--) {
//       const tmp = a[j];
//       const order = compareFn();
//       if (order > 0) {
//         a[j + 1] = tmp;
//       } else {
//         break;
//       }
//     }
//     a[j + 1] = ele;
//   }
// }

// const arr = [1, 2, 3];
// insertionSort(arr, 0, 3);
// console.log(arr);

const nums = 10000;
const res: { [key: string]: any } = {};
for (let i = 0; i < nums; i += 1) {
  const arr = [1, 2, 3];
  const key = `[${arr.sort(compareFn).join(',')}]`;
  if (res[key]) {
    res[key] += 1;
  } else {
    res[key] = 1;
  }
}
for (const k in res) {
  res[k] = `${(res[k] * 100) / nums}%`;
}

console.log(res);

const obj: { [key: string]: any } = {};
function shuffle(arr: number[]) {
  for (let i = 0; i < arr.length; i += 1) {
    const index = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[index]] = [arr[index], arr[i]];
  }
}

for (let i = 0; i < 100000; i += 1) {
  const arr2 = [1, 2, 3];
  shuffle(arr2);
  const key = `[${arr2.join(',')}]`;
  if (obj[key]) {
    obj[key] += 1;
  } else {
    obj[key] = 1;
  }
}

for (const k in obj) {
  obj[k] = `${(obj[k] * 100) / 100000}%`;
}
console.log(obj);

export {};
