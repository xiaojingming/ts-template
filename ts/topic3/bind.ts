/* eslint-disable no-unused-vars */
const foo = {
  value: 2,
};
function bar(a: number, b: number) {
  return (this.value * a) + b;
}
bar.prototype.test = function test() {
  return 'test';
};

const Bar = bar.bind(foo);
const b1 = new (Bar as any)();
console.log(b1.test());
// console.log((bar.bind(foo, 2)(3))); // 6

function myBind(context: any = window, ...params1: any[]) {
  const f = this;
  function P() {}
  const Ctor = function fn(...params2: any[]) {
    const params = params1.concat(params2);
    const res = f.apply(this instanceof Ctor ? this : context, params);
    return res;
  };
  P.prototype = f.prototype;
  Ctor.prototype = new (P as any)();
  return Ctor;
}

(Function.prototype as any).myBind = myBind;
const F = (bar as any).myBind(foo, 4);
const f1 = new F();
console.log(f1.test());
// console.log(f(2)); // 8

export {};
