/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
interface Obj {
  [K: string]: any
}

function shallowCopy(target: any) {
  if (!target || typeof target !== 'object') {
    return target;
  }
  const res: any[] | Obj = Array.isArray(target) ? [] : {};
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      (res as any)[key] = target[key];
    }
  }
  return res;
}

function deepCopy(target: any) {
  if (!target || typeof target !== 'object') {
    return target;
  }
  const res: any[] | Obj = Array.isArray(target) ? [] : {};
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      (res as any)[key] = typeof target[key] === 'object' ? deepCopy(target[key]) : target[key];
    }
  }
  return res;
}

const arr = [1, 2, [3, 4]];
const $arr = deepCopy(arr);
(arr[2] as number[]).push(5);
console.log($arr);

export {};
