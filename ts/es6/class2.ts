/* eslint-disable max-classes-per-file */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */
function Parent(name: string) {
  this.name = name;
}
Parent.prototype.getName = function getName(this: { name: string }) {
  return this.name;
};
function Child(name: string, age: number) {
  Parent.call(this, name);
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);

const c1 = new (Parent as any)('xjm', 25);
console.log(c1.getName()); // xjm

class _Person {
  constructor(public name: string) {}

  static test() {
    console.log('test');
  }

  getName() {
    return this.name;
  }
}

class _Child extends _Person {
  constructor(name: string, public age: number) {
    super(name);
  }
}

const c2 = new _Child('xiao', 25);
console.log(c2.getName()); // xiao
console.log(Reflect.getPrototypeOf(_Child) === _Person); // true
console.log(Reflect.getPrototypeOf(_Child.prototype) === _Person.prototype); // true

class A extends null {}

console.log(Reflect.getPrototypeOf(A) === Function.prototype);

export {};
