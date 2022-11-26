/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
interface O {
  [K: string]: any;
}

function shallowCopy<T extends O | any[]>(target: T) {
  if (Array.isArray(target)) {
    const res: any[] = [];
    for (let i = 0; i < target.length; i += 1) {
      res[i] = target[i];
    }
    return res;
  }
  const res: O = {};
  for (const key in target) {
    res[key] = target[key];
  }
  return res;
}

const obj = {
  bar: [1],
};

const shallowObj = shallowCopy(obj);
console.log(shallowObj);

function deepCopy<T extends O | any[]>(target: T) {
  if (Array.isArray(target)) {
    const res: any[] = [];
    for (let i = 0; i < target.length; i += 1) {
      const val = target[i];
      res[i] = typeof val === 'object' ? deepCopy(val) : val;
    }
    return res;
  }
  const res: O = {};
  for (const key in target) {
    res[key] = typeof target[key] === 'object' ? deepCopy((target[key] as O)) : target[key];
  }
  return res;
}

const deepObj = deepCopy(obj);
console.log(deepObj);

export {};
