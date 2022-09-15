/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-multi-assign */
/* eslint-disable no-cond-assign */
/* eslint-disable no-self-compare */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
interface MySetInstance {
  size: number;
  add(item: any): MySetInstance;
  has(item: any): boolean;
  delete(item: any): boolean;
  clear(): void;
  forEach(
    callback: (val: any, key: any, set: any) => void,
    thisArg: any,
  ): void;
  keys<T>(): IterableIterator<T>;
  values<T>(): IterableIterator<T>;
  entries<T>(): IterableIterator<T>;
}

function makeIterator(target: any, iterator: any) {
  let i = 0;
  const obj = {
    next() {
      const done = i === target.length;
      const value = !done ? iterator(target[i++]) : undefined;
      return {
        done,
        value,
      };
    },
  };
  (obj as any)[Symbol.iterator] = function f() {
    return obj;
  };
  return obj;
}

function forOf(target: any, callback: (...res: any[]) => void) {
  if (typeof target[Symbol.iterator] !== 'function') {
    throw new TypeError(`${target} is not iterable`);
  }
  if (typeof callback !== 'function') {
    throw new TypeError(`${callback} must be callable`);
  }
  const iter = target[Symbol.iterator]();
  let val;
  while (!(val = iter.next()).done) {
    callback(val.value);
  }
}

(function f(context) {
  const NaNSymbol = Symbol('NaN');

  function Set<T>(data: any) {
    this._values = [];
    this.size = 0;
    if (data) {
      forOf(data, (item: any) => {
        this.add(item);
      });
    }
  }

  // 配合Symbol实现Set能区分NaN（可以直接使用includes）
  function encode(val: any) {
    return val !== val ? NaNSymbol : val;
  }

  Set.prototype.add = function add(item: any) {
    const val = encode(item);
    if (this._values.indexOf(val) === -1) {
      this._values.push(val);
      this.size += 1;
    }
    return this;
  };

  Set.prototype.has = function has(item: any) {
    return this._values.indexOf(encode(item)) !== -1;
  };

  Set.prototype.delete = function deleteItem(item: any) {
    const index = this._values.indexOf(encode(item));
    if (index > -1) {
      this._values.splice(index, 1);
      this.size -= 1;
    }
    return index > -1;
  };

  Set.prototype.clear = function clear() {
    this._values = [];
    this.size = 0;
  };

  Set.prototype.values = Set.prototype.keys = function fn() {
    return makeIterator(this._values, (i: any) => encode(i));
  };

  Set.prototype.entries = function entries() {
    return makeIterator(this._values, (i: any) => [encode(i), encode(i)]);
  };

  Set.prototype.forEach = function forEach(
    callback: (val: any, key: any, set: any) => void,
    thisArg = window,
  ) {
    forOf(this._values, (i) => callback.call(thisArg, i, i, this));
  };

  Set.prototype[Symbol.iterator] = function iterator() {
    return this.keys();
  };

  Set._length = 0;

  (context as any).MySet = Set;
}(window));

const s1: MySetInstance = new ((window as any).MySet)([1, 2, 3, 4, 4]);
console.log(s1.size); // 4
s1.delete(1);
console.log(s1.has(1)); // false
s1.clear();
console.log(s1.size); // 0
// s1.forEach((...res: any[]) => console.log(res), window);
console.log('%c---------------->', 'color: red;');

const s2: MySetInstance = new ((window as any).MySet)([1, 2, 3]);
s2.add(NaN);
console.log(s2.size);
s2.add(NaN);
console.log(s2.size);
console.log('%c---------------->', 'color: red;');

const set = new Set([1, 2, 3]);
console.log(set.keys());
console.log([...set]);
console.log([...set.keys()]);
console.log([...set.values()]);
console.log([...set.entries()]);
console.log(new Set(new Set([1, 2, 3])).size); // 3
console.log('%c---------------->', 'color: red;');

const s3: MySetInstance = new ((window as any).MySet)(new Set([1, 2, 3]));
for (const key of (s3 as any)) {
  console.log(key, '---'); // 1 2 3
}
console.log([...s3.keys()]); // [1, 2, 3]
console.log([...s3.values()]); // [1, 2, 3]
console.log([...s3.entries()]); // [[1, 1], [2, 2], [3, 3]]
s3.forEach((i, v) => {
  console.log(i, v);
}, window);
export {};
