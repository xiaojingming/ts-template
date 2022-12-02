/* eslint-disable no-unused-vars */
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

const t1 = new (Test as any)('xiao', 25);
console.log(t1.name); // 'xiao'
console.log(t1.age); // 25
console.log(t1.strength); // 95
console.log(t1.getInfo()); // { name: 'xiao', age: 25, };

function myNew(Ctor: any, ...params: any[]) {
  const obj = {};
  function F() {}
  F.prototype = Ctor.prototype;
  Reflect.setPrototypeOf(obj, new (F as any)());
  const res = Ctor.apply(obj, params);
  return res && (typeof res === 'object') ? res : obj;
}

const t2 = myNew(Test, 'xjm', 25);
console.log(t2.name);
console.log(t2.age);
console.log(t2.strength);
console.log(t2.getInfo());

export {};
