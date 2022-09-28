/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
const _ = {};
const subtract = (a: number, b: number, c :number) => c - b - a;
/**
 * 目标函数的偏函数
 * @param fn 目标函数
 * @param param 第一个参数
 * @returns 目标函数的偏函数
 */
function partial(fn: (...res: any[]) => any, param: any) {
  return function f(...params: any[]) {
    return fn.apply(this, [param, ...params]);
  };
}
/**
 * 拥有占位符的目标函数的偏函数
 * @param fn 目标函数
 * @param params1 参数组成的数组
 * @returns 目标函数的偏函数
 */
function partial2(fn: (...res: any[]) => any, ...params1: any[]) {
  let index = 0;
  const params: any[] = [];
  return function f(...params2: any[]) {
    for (let i = 0; i < params1.length; i += 1) {
      const val = params1[i];
      params.push(val === _ ? params2[index++] : val);
    }
    while (index < params2.length) {
      params.push(params2[index++]);
    }
    return fn.apply(this, params);
  };
}

console.log(partial2(subtract, _, 10, _)(5, 35)); // 20
console.log(partial2(subtract, 1, 2, _)(3)); // 0
export {};
