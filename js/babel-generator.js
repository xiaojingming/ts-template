function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  yield 'ending';
}

const it = helloWorldGenerator();
console.log(it.next().value); // hello
console.log(it.next().value); // world
console.log(it.next().value); // ending
console.log(it.next().value); // undefined
console.log(it.next().value);

// runtime.mark = function(genFun) {
//   if (Object.setPrototypeOf) {
//     Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
//   } else {
//     genFun.__proto__ = GeneratorFunctionPrototype;
//     if (!(toStringTagSymbol in genFun)) {
//       genFun[toStringTagSymbol] = "GeneratorFunction";
//     }
//   }
//   genFun.prototype = Object.create(Gp);
//   return genFun;
// };

// function defineIteratorMethods(prototype) {
//   ["next", "throw", "return"].forEach(function(method) {
//     prototype[method] = function(arg) {
//       return this._invoke(method, arg);
//     };
//   });
// }
