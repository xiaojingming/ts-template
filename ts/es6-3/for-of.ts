/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
function createIterator(items: any[]) {
  let i = 0;
  return {
    next: function f() {
      return {
        done: i++ === items.length,
        value: items[i - 1],
      };
    },
  };
}

const itearator = createIterator([1, 2, 3]);
// console.log(itearator.next());
// console.log(itearator.next());
// console.log(itearator.next());
// console.log(itearator.next());

const obj: any = {};
obj[Symbol.iterator] = function f() {
  return itearator;
};

// for (const key of obj) {
//   console.log(key);
// }
/**
 * for of的模拟实现
 * @param target 迭代目标
 * @param cb 执行迭代的回调函数
 */
function forOf(target: any, cb: any) {
  if (typeof target[Symbol.iterator] !== 'function') {
    throw new TypeError(`${target} is not an iterator`);
  }
  if (typeof cb !== 'function') {
    throw new TypeError(`${cb} is not a function`);
  }
  const itea = target[Symbol.iterator]();
  let val = itea.next();
  while (!val.done) {
    cb(val.value);
    val = itea.next();
  }
}

forOf(obj, (key: any) => console.log(key));

export {};
