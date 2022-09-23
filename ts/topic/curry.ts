/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const _ = {};
function subCurry(fn: (...res: any[]) => any, ...res1: any[]) {
  return function f(...res2: any[]) {
    return fn.apply(this, res1.concat(res2));
  };
}
function curry(fn: (...res: any[]) => any, length = fn.length) {
  return function f(...params: any[]) {
    if (params.length >= length) {
      return fn.apply(this, params);
    }
    return curry(subCurry.apply(this, [fn, ...params]), length - params.length);
  };
}
let add: (...res: any[]) => any = (a: number, b: number, c: number) => a + b + c;
add = subCurry(add, 1);
console.log(add(2, 3)); // 6
let sum: (...res: any[]) => any = (
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
) => a + b + c + d + e;
sum = curry(sum);
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(1, 2, 3, 4)(5)); // 15
console.log(sum(1, 2, 3)(4, 5)); // 15
console.log(sum(1)(2)(3)(4)(5)); // 15
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log('%c---------------->', 'color: red;');

let sum2: (...res: any[]) => any = (a: number, b: number, c: number) => a + b + c;
function curry2(fn: (...res: any[]) => any, args: any[] = []) {
  return function f(...params: any[]) {
    const _args = args.slice(0);
    for (let i = 0; i < params.length; i += 1) {
      _args.push(params[i]);
    }
    if (_args.length < fn.length) {
      return curry2.call(this, fn, _args);
    }
    return fn.apply(this, _args);
  };
}
sum2 = curry2(sum2);
console.log(sum2(1)(2)(3)); // 6
console.log(sum2(1)(2, 3)); // 6
console.log(sum2(2)(4, 6)); // 12
console.log(sum2(2, 4, 6)); // 12
console.log('%c---------------->', 'color: red;');

function curry3(
  fn: (...res: any[]) => any,
  args: any[] = [],
  holes: any[] = [],
) {
  const { length } = fn;
  return function f(...params: any[]) {
    const _args = args.slice(0);
    const _holes = holes.slice(0);
    const argsLength = args.length;
    const holesLength = holes.length;
    let index = 0;
    for (let i = 0; i < params.length; i += 1) {
      const arg = params[i];
      if (arg === _ && holesLength) {
        index += 1;
        if (index > holesLength) {
          _args.push(arg);
          _holes.push(argsLength - 1 + index - holesLength);
        }
      } else if (arg === _) {
        _args.push(arg);
        _holes.push(argsLength + i);
      } else if (holesLength) {
        if (index >= holesLength) {
          _args.push(arg);
        } else {
          _args.splice(_holes[index], 1, arg);
          _holes.splice(index, 1);
        }
      } else {
        _args.push(arg);
      }
    }
    if (_holes.length || _args.length < length) {
      return curry3.call(this, fn, _args, _holes);
    }
    return fn.apply(this, _args);
  };
}
const f = curry3((a, b, c, d, e) => [a, b, c, d, e]);
console.log(f(1, 2, 3, 4, 5)); // [1, 2, 3, 4, 5]
console.log(f(_, 2, 3, 4, 5)(1)); // [1, 2, 3, 4, 5]
console.log(f(1, _, 3, 4, 5)(2)); // [1, 2, 3, 4, 5]
console.log(f(1, _, 3)(_, 4)(2)(5)); // [1, 2, 3, 4, 5]
console.log(f(1, _, _, 4)(_, 3)(2)(5)); // [1, 2, 3, 4, 5]
console.log(f(_, 2)(_, _, 4)(1)(3)(5)); // [1, 2, 3, 4, 5]
// let sum3 = (a: number, b: number, c: number) => a + b + c;
// sum3 = curry3(sum3);
// console.log(sum3(1, 2, 3)); // 6
// console.log(sum3(4, 5, 6)); // 15
// console.log(sum3(7, 8, 9)); // 24
export {};
