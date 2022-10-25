/* eslint-disable no-unused-vars */
const arr1 = [6, 4, 1, 81, 2, 11, 23];

// let result = arr[0];
// for (let i = 1; i < arr.length; i += 1) {
//   result = result > arr[i] ? result : arr[i];
// }
// console.log(result);

function max(arr: number[]) {
  return arr.reduce((prev, cur) => (prev > cur ? prev : cur));
}
// console.log(max(arr1)); // 81
function max2(arr: number[]) {
  return arr.concat().sort((a, b) => (a - b > 0 ? 1 : -1))[arr.length - 1];
}
// console.log(max2(arr1));
console.log(Math.max.apply(null, arr1));
console.log(Math.max(...arr1));

export {};
