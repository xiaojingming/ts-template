/* eslint-disable no-cond-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
function createIterator(items: any[]) {
  let i = 0;
  return {
    next() {
      const done = i >= items.length;
      const value = !done ? items[i++] : undefined;
      return {
        done,
        value,
      };
    },
  };
}
const iterator = createIterator([1, 2, 3]);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log('%c---------------->', 'color: red;');

const obj = {
  value: 1,
};
(obj as any)[Symbol.iterator] = function f() {
  return createIterator([1, 2, 3]);
};
// for (const key of (obj as any)) {
//   console.log(key);
// }
const arr = [1, 3, 5];
function forOf<T>(target: T, f: (...res: any[]) => void) {
  if (typeof (target as any)[Symbol.iterator] !== 'function') {
    throw new TypeError(`${target} is not iterable`);
  }
  if (typeof f !== 'function') {
    throw new TypeError(`${f} must be callable`);
  }
  const iter = (target as any)[Symbol.iterator]();
  let v;
  while (!(v = iter.next()).done) {
    f(v.value);
  }
}
forOf(arr, (v) => console.log(v));
export {};
