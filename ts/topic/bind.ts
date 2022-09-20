/* eslint-disable no-unused-vars */
const foo = {
  value: 'foo',
};
function bar(name: string, age: number) {
  return `name-${name},age-${age},value-${this.value}`;
}
bar.prototype.a = 1111;
const B = bar.bind(foo);
const b1 = new (B as any)();
console.log(b1.a); // 1111;
console.log(bar.bind(foo)('xiao', 25)); // name-xiao,age-25,value-foo

function myBind(context: any, ...params1: any[]) {
  const fn = this;
  if (typeof fn !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable');
  }
  const Ctor = function Ctor(...params2: any[]) {
    return fn.apply(this instanceof Ctor ? this : context, params1.concat(params2));
  };
  function P() {}
  P.prototype = fn.prototype;
  Ctor.prototype = new (P as any)();
  return Ctor;
}

(Function.prototype as any).myBind = myBind;
console.log((bar as any).myBind(foo, 'xjm')(25));
const C = (bar as any).myBind(foo);
const c1 = new C();
console.log(c1.a); // 1111
export {};
