/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
/* eslint-disable no-underscore-dangle */
class Example {
  _private: string;

  constructor() {
    this._private = 'private';
  }

  getName() {
    return this._private;
  }
}

const ex = new Example();

console.log(ex.getName()); // private
console.log(ex._private); // private
console.log('%c---------------->', 'color: red;');

class Example2 {
  constructor() {
    const _private = 'private';
    (this as any).getName = () => _private;
  }
}

const ex2 = new Example2();

console.log((ex2 as any).getName()); // private
console.log((ex2 as any)._private); // undefined
console.log('%c---------------->', 'color: red;');

const Example3 = (function f() {
  let _private = '';
  class $Example3 {
    constructor() {
      _private = 'private';
    }

    getName() {
      return _private;
    }
  }
  return $Example3;
}());

const ex3 = new Example3();
console.log(ex3.getName()); // private
console.log((ex3 as any)._private); // undefined
console.log('%c---------------->', 'color: red;');

const Example4 = (function f() {
  const _private = Symbol('private');
  class $Example4 {
    constructor() {
      (this as any)[_private] = 'private';
    }

    getName() {
      return (this as any)[_private];
    }
  }
  return $Example4;
}());

const ex4 = new Example4();
console.log(ex4.getName()); // private
console.log((ex4 as any).private); // undefined
console.log('%c---------------->', 'color: red;');

const wm = new WeakMap();
class Example5 {
  constructor() {
    wm.set(this, 'private');
  }

  getName() {
    return wm.get(this);
  }
}

const ex5 = new Example5();
console.log(ex5.getName()); // private
console.log((ex5 as any).private); // undefined
console.log('%c---------------->', 'color: red;');

const Example6 = (function f() {
  const wm2 = new WeakMap();
  class $Example6 {
    constructor() {
      wm2.set(this, 'private');
    }

    getName() {
      return wm2.get(this);
    }
  }
  return $Example6;
}());
const ex6 = new Example6();
console.log(ex6.getName());
console.log((ex6 as any).private);
console.log('%c---------------->', 'color: red;');

class Point {
  #x: number;

  #y: number;

  constructor(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }

  equals({ x, y }: { x: number, y: number }) {
    return this.#x === x && this.#y === y;
  }
}

const p1 = new Point(1, 2);
console.log(p1);

class Foo {
  private value: number = 1;

  equals({ value }: { value: number }) {
    return this.value === value;
  }
}

// const f1 = new Foo();
// const f2 = new Foo();

// console.log(f1.equals(f2), 'xxxx');

export {};
