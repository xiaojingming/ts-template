/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
interface O {
  [key: string]: any;
}

function shallowClone(target: O | any[]) {
  const res: O | any[] = Array.isArray(target) ? [] : {};
  for (const key in target) {
    if (Array.isArray(res)) {
      res[Number(key)] = (target as any[])[Number(key)];
    } else {
      res[key] = (target as O)[key];
    }
  }
  return res;
}

function deepClone(target: any) {
  const res: any = Array.isArray(target) ? [] : {};
  for (const key in target) {
    res[key] = typeof target[key] === 'object' ? deepClone(target[key]) : target[key];
  }
  return res;
}

const obj = {
  a: [1],
};
const shallowObj = shallowClone(obj);
console.log(shallowObj);
obj.a.push(2);
console.log(shallowObj);
console.log('%c---------------->', 'color: red;');

const deepObj = deepClone(obj);
console.log(deepObj);
obj.a.push(3);
console.log(deepObj.a, obj.a);

export { };
