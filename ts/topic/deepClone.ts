/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
type O = {
  [key: string | number]: any;
};

function shallowCopy(target: O | any[]) {
  const res: O | any[] = Array.isArray(target) ? [] : {};
  for (const key in target) {
    res[key] = target;
  }
  return res;
}
function deepCopy(target: O | any[]) {
  const res: O | any[] = Array.isArray(target) ? [] : {};
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      res[key] = typeof target[key] === 'object' ? deepCopy(target[key]) : target[key];
    }
  }
  return res;
}
export {};
