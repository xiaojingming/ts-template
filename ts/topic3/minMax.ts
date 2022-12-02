/* eslint-disable no-unused-vars */
const arr = [6, 4, 1, 81, 2, 11, 23];

// for循环获取最大值
let target = arr[0];

for (let i = 1; i < arr.length; i += 1) {
  target = Math.max(target, arr[i]);
}
console.log(target); // 81

// reduce获取最大值
console.log(arr.reduce((prev, cur) => Math.max(prev, cur))); // 81

// 排序后获取
console.log(arr.sort((a, b) => a - b)[arr.length - 1]); // 81

// apply
console.log(Math.max.apply(null, arr)); // 81

// 扩展运算符
console.log(Math.max(...arr));

export {};
