/* eslint-disable no-unused-vars */
function Otaku(name: string, age: number) {
  this.name = name;
  this.age = age;
  this.hobbit = 'fontend';
}

Otaku.prototype.strength = 60;
Otaku.prototype.sayName = function sayName() {
  console.log(`I am ${this.name}`);
};

function myNew(Ctor: (...res: any[]) => any, ...params: any[]) {
  // eslint-disable-next-line no-new-object
  const obj = new Object();
  // function P() {}
  // P.prototype = Ctor.prototype;
  // Reflect.setPrototypeOf(obj, new (P as any)());
  Reflect.setPrototypeOf(obj, Ctor.prototype);
  const result = Ctor.apply(obj, params);
  return (result && typeof result === 'object') || obj;
}
const o1 = myNew(Otaku, 'zs', 28);
o1.sayName();
export {};
