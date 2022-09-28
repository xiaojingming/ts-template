/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
interface Attach {
  attachEvent(type: `on${string}`, cb: (...res: any[]) => void): void;
}
// interface Foo {
//   (): Date;
//   t?: Date;
// }

// 实现foo函数，返回首次调用时的Date对象
// let t: Date;
// function foo() {
//   if (t) {
//     return t;
//   }
//   t = new Date();
//   return t;
// }

// 通过闭包实现
// const foo = (function f() {
//   let t: Date;
//   return function bar() {
//     if (t) {
//       return t;
//     }
//     t = new Date();
//     return t;
//   };
// }());

// 通过函数对象实现
// const foo: Foo = function f() {
//   if (foo.t) {
//     return foo.t;
//   }
//   foo.t = new Date();
//   return foo.t;
// };

// 惰性函数
// let foo = function bar() {
//   const t = new Date();
//   foo = function fn() {
//     return t;
//   };
// };

// addEvent
let addEvent = function fn(
  type: keyof WindowEventMap,
  el: HTMLElement,
  callback: (...res: any[]) => void,
) {
  if (Reflect.has(window, 'addEventListener')) {
    addEvent = function f(
      subType: keyof WindowEventMap,
      subEl: HTMLElement,
      subCallback: (...res: any[]) => void,
    ) {
      subEl.addEventListener(subType, subCallback);
    };
  } else if (Reflect.has(window, 'attachEvent')) {
    addEvent = function f(
      subType: keyof WindowEventMap,
      subEl: HTMLElement,
      subCallback: (...res: any[]) => void,
    ) {
      (subEl as unknown as Attach).attachEvent(`on${subType}`, subCallback);
    };
  }
  addEvent(type, el, callback);
};

export {};
