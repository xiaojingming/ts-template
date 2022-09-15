const arr1 = [6, 4, 1, 8, 2, 11, 23];

// for循环获取最大值
function max1(arr: number[]) {
  let res = arr[0];
  for (let i = 1; i < arr.length; i += 1) {
    res = Math.max(res, arr[i]);
  }
  return res;
}
console.log(max1(arr1));

// reduce
function max2(arr: number[]) {
  return arr.reduce((prev, cur) => Math.max(prev, cur));
}
console.log(max2(arr1));

// 排序
function max3(arr: number[]) {
  return arr.concat().sort((a, b) => b - 1)[arr.length - 1];
}
console.log(max3(arr1));
export {};
