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
}

(function f(context) {
  const NaNSymbol = Symbol('NaN');

  function Set<T>(data: any) {
    this._values = [];
    this.size = 0;
    if (data) {
      data.forEach((item: any) => {
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

  Set.prototype.forEach = function forEach(
    callback: (val: any, key: any, set: any) => void,
    thisArg = window,
  ) {
    for (let i = 0; i < this._values.length; i += 1) {
      const val = this._values[i];
      callback.call(thisArg, val, val, this);
    }
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
export {};
