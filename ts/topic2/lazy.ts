/* eslint-disable no-unused-vars */
// 我们现在需要写一个 foo 函数，这个函数返回首次调用时的 Date 对象，注意是首次。
type D = {
  date?: Date;
}
interface F extends D{
  (): Date;
}
interface Attach {
  attachEvent?(event: `on${string}`, fn: (...res: any[]) => void): void;
}
type El = {
  [K in keyof HTMLElement]: HTMLElement[K];
} & Attach;
type Global = {
  [K in keyof Window]: Window[K];
} & Attach;
type ExtractAttch<T> = {
  [K in keyof T]-?: T[K];
}

let date1: Date;
function foo1() {
  if (date1) {
    return date1;
  }
  date1 = new Date();
  return date1;
}

console.log(foo1());
console.log(foo1());
console.log(foo1());

const foo2 = (function fn() {
  let date2: Date;
  return function f() {
    if (date2) {
      return date2;
    }
    date2 = new Date();
    return date2;
  };
}());

console.log(foo2());
console.log(foo2());
console.log(foo2());

const foo3: F = function fn() {
  if (foo3.date) {
    return foo3.date;
  }
  foo3.date = new Date();
  return foo3.date;
};
console.log(foo3());
console.log(foo3());
console.log(foo3());

let foo = function f() {
  const date: Date = new Date();
  foo = function subF() {
    return date;
  };
  return date;
};
console.log(foo());
console.log(foo());
console.log(foo());

let addEvent = function f(el: El, type: any, fn: any) {
  if ((window as Global).addEventListener) {
    addEvent = function fns(e, event, callback) {
      e.addEventListener(event, callback);
    };
  } else if ((window as Global).attachEvent) {
    addEvent = function fns(e, event, callback) {
      (e as ExtractAttch<El>).attachEvent(event, callback);
    };
  }
  addEvent(el, type, fn);
};

export {};
