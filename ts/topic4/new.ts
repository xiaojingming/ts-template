/* eslint-disable no-new-object */
/* eslint-disable no-unused-vars */
interface F {
  (...res: any): any
}

function Test(name: string, age: number) {
  this.name = name;
  this.age = age;
}

Test.prototype.strength = 95;
Test.prototype.getInfo = function fn() {
  return {
    name: this.name,
    age: this.age,
  };
};

function myNew(f: F, ...res: any[]) {
  const obj = new Object();
  function P() {}
  P.prototype = f.prototype;
  Reflect.setPrototypeOf(obj, new (P as any)());
  const result = f.apply(obj, res);
  return result && typeof result === 'object' ? result : obj;
}

const t1 = myNew(Test, 'xiao', 25);
console.log(t1.name);
console.log(t1.age);
console.log(t1.strength);
console.log(t1.getInfo());

export {};
