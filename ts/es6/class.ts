/* eslint-disable no-underscore-dangle */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable no-unused-vars */

// ES6
class Person {
  constructor(public _name: string) {}

  sayHello() {
    console.log(`Hello ${this.name} !!!`);
  }

  get name() {
    return this._name;
  }

  set name(val) {
    this._name = val;
  }
}

const p1 = new Person('xiao');
p1.sayHello();

// ES5
function _Person(name: string) {
  this._name = name;
}
_Person.prototype = {
  sayHello(this: { name: string }) {
    console.log(`Hello ${this.name} !!!`);
  },
  get name() {
    return this._name;
  },
  set name(v) {
    this._name = v;
  },
};

const _p1 = new (_Person as any)('xjm');
_p1.sayHello();
console.log(_p1.name);

console.table([Object.keys(Person.prototype), Object.keys(_Person.prototype)]);

export {};
