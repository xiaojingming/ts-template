/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// 实现 foo 函数，这个函数返回首次调用时的 Date 对象
interface D {
  t?: Date,
}
interface Foo extends D{
  (): Date,
}
interface EventTarget {
  addEventListener(el: HTMLElement, type: string, fn: (...res: any[]) => void): void,
  attachEvent(type: `on${string}`, fn: (...res: any[]) => any): void,
}

let t1: Date;
function foo1() {
  if (t1) {
    return t1;
  }
  t1 = new Date();
  return t1;
}

console.log(foo1());

const foo2 = (function f() {
  let t2: Date;
  return function fn() {
    if (t2) {
      return t2;
    }
    t2 = new Date();
    return t2;
  };
}());

console.log(foo2());

const foo3: Foo = function fn() {
  if (foo3.t) {
    return foo3.t;
  }
  foo3.t = new Date();
  return foo3.t;
};

let foo: any = function fn(): () => any {
  const date = new Date();
  foo = function f() {
    return date;
  };
  return foo();
};

console.log(foo());
setTimeout(() => {
  console.log(foo());
}, 3000);

function addEvent(
  el: HTMLElement,
  type: string,
  fn: (...res: any[]) => void,
) {
  if ((window as unknown as EventTarget).addEventListener) {
    el.addEventListener(type, fn, false);
  } else if ((window as unknown as EventTarget).attachEvent) {
    (el as unknown as EventTarget).attachEvent(`on${type}`, fn);
  }
}

let addEventTo: any = function f(
  el: HTMLElement,
  type: string,
  fns: (...res: any[]) => void,
) {
  if ((window as unknown as EventTarget).addEventListener) {
    addEventTo = function subFn(e: HTMLElement, t: string, f2: (...res: any[]) => void) {
      debugger;
      e.addEventListener(t, f2, false);
    };
  } else if ((window as unknown as EventTarget).attachEvent) {
    addEventTo = function subFn(e: HTMLElement, t: string, f2: (...res: any[]) => void) {
      (e as unknown as EventTarget).attachEvent(`on${t}`, f2);
    };
  }
  addEventTo(el, type, fns);
};

const btn = document.querySelector('#add');
addEventTo(btn, 'click', () => {
  console.log('xxx');
});

export {};
