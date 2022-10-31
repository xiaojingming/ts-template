/* eslint-disable no-unused-vars */
function Person(name: string, age: number) {
  this.name = name;
  this.age = age;
  console.log(this);
}
Person.prototype.getName = function getName() {
  return this.name;
};
Person.prototype.getAge = function getAge() {
  return this.age;
};
console.log(new (Person as any)('xjm', 25));

function myNew(Ctor: (...res: any[]) => any, ...params: any[]) {
  const obj = {};
  function F() {}
  F.prototype = Ctor.prototype;
  Reflect.setPrototypeOf(obj, new (F as any)());
  const res = Ctor.apply(obj, params);
  return (res && typeof res === 'object') ? res : obj;
}

const p1 = myNew(Person, 'xiao', 25);
console.log(p1.getAge(), p1.getName());
export {};
