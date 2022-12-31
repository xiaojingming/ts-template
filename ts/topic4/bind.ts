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

const Bctor = bar.bind(foo);
const bc1 = new (Bctor as any)();
console.log(bc1);

function myBind(context: any = window, ...params: any[]) {
  const fn = this;
  const Ctor = function f(...subParams: any[]) {
    const args = params.concat(subParams);
    return fn.apply(this instanceof Ctor ? this : context, args);
  };
  function P() {}
  P.prototype = fn.prototype;
  Ctor.prototype = new (P as any)();
  return Ctor;
}

(Function.prototype as any).myBind = myBind;
const b1 = (bar as any).myBind(foo);
const b2 = (bar as any).myBind(foo, 4);
console.log(b1(3, 4)); // 10
console.log(b2(2)); // 10
const B = (bar as any).myBind(foo);
const b3 = new B(1, 2);
console.log(b3.test());

export {};
