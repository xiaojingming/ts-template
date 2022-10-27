/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
interface Mbind extends Function {
  myBind(...res: any[]): any
}

const foo = {
  val: 20,
};
function bar(n1: number, n2: number) {
  return this.val + n1 + n2;
}
bar.prototype.info = 'bar-info';
const B = bar.bind(foo);
const b1 = new (B as any)();
console.log(b1);

function myBind(context: any, ...params1: any[]) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
  }
  context = context || window;
  const self = this;
  function F() {}
  const Ctor = function f(...params2: any[]) {
    return self.apply(this instanceof Ctor ? this : context, params1.concat(params2));
  };
  F.prototype = self.prototype;
  Ctor.prototype = new (F as any)();
  return Ctor;
}

(Function.prototype as Mbind).myBind = myBind;
const f = (bar as unknown as Mbind).myBind(foo, 10);
const F = (bar as unknown as Mbind).myBind(foo, 10);
console.log(f(30)); // 60
const f1 = new F();
console.log(f1.info); // bar-info
export {};
