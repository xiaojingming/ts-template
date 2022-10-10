/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
interface O {
  [K: string]: any;
}
const sum = [0, 0, 0, 0, 0];

// for (let i = 0; i < 100000; i += 1) {
//   const arr = [1, 2, 3, 4, 5];
//   arr.sort(() => (Math.random() - 0.5));
//   sum[arr[arr.length - 1] - 1] += 1;
// }
// console.log(sum);

const times = 100000;
const o: O = {};

function shuffle(arr: number[]) {
  for (let i = arr.length; i; i -= 1) {
    const index = Math.floor(Math.random() * i);
    [arr[i - 1], arr[index]] = [arr[index], arr[i - 1]];
  }
}

for (let i = 0; i < times; i += 1) {
  const arr = [1, 2, 3];
  shuffle(arr);
  const key = JSON.stringify(arr);
  if (key in o) {
    o[key] += 1;
  } else {
    o[key] = 1;
  }
}
for (const k in o) {
  o[k] = `${(o[k] / times) * 100}%`;
}
console.log(o);
export {};
