/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const _ = {};

function subCurry(f: (...res: any[]) => any, ...params1: any[]) {
  return function fn(...params2: any[]) {
    return f.apply(this, params1.concat(params2));
  };
}

const add = (a: number, b: number) => a + b;
const sAdd = subCurry(add, 1);
console.log(sAdd(2));

function curry(f: (...res: any[]) => any, length = f.length) {
  return function fn(...params: any[]) {
    if (params.length >= length) {
      return f.apply(this, params);
    }
    return curry(subCurry.apply(this, [f, ...params]), length - params.length);
  };
}
const sum = (a: number, b: number, c: number, d: number, e: number) => a * b * c * d * e;
const cSum = curry(sum);
console.log(cSum(1)(2)(3)(4)(5)); // 120

function curry2(f: (...res: any[]) => any, args: any[] = []) {
  return function fn(...params: any[]) {
    let $args = args.slice(0);
    $args = $args.concat(params);
    if ($args.length >= f.length) {
      return f.apply(this, $args);
    }
    return curry2.call(this, f, $args);
  };
}
const sum2 = (a: number, b: number, c: number, d: number, e: number) => a + b + c + d + e;
const cSum2 = curry2(sum2);
console.log(cSum2(1)(2)(3, 4)(15)); // 25
console.log('%c---------------->', 'color: red;');

function curry3(
  f: (...res: any[]) => any,
  args: any[] = [],
  holes: any[] = [],
) {
  const { length } = f;
  return function fn(...params: any[]) {
    let index = 0;
    const _args = args.slice(0);
    const _holes = holes.slice(0);
    const { length: argsLength } = args;
    const { length: holesLength } = holes;
    for (let i = 0; i < params.length; i += 1) {
      const val = params[i];
      if (val === _ && holesLength) {
        index += 1;
        if (index > holesLength) {
          _args.push(val);
          _holes.push(argsLength - 1 + index - holesLength);
        }
      } else if (val === _) {
        _args.push(val);
        _holes.push(argsLength + i);
      } else if (holesLength) {
        if (index >= holesLength) {
          _args.push(val);
        } else {
          _args.splice(_holes[index], 1, val);
          _holes.splice(index, 1);
        }
      } else {
        _args.push(val);
      }
    }
    if (_holes.length || _args.length < length) {
      return curry3.call(this, f, _args, _holes);
    }
    return f.apply(this, _args);
  };
}

const foo = (a: number, b: number, c: number, d: number, e: number) => console.log([a, b, c, d, e]);
const cFoo = curry3(foo);

// cFoo(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]f
// cFoo(_, 2, 3, 4, 5)(1); // [1, 2, 3, 4, 5]
// cFoo(1, _, 3, 4, 5)(2); // [1, 2, 3, 4, 5]
// cFoo(1, _, 3)(_, 4)(2, 5); // [1, 2, 3, 4, 5]
// cFoo(1, _, _, 4)(_, 3)(2)(5); // [1, 2, 3, 4, 5]
// cFoo(_, 2)(_, _, 4)(1)(3)(5); // [1, 2, 3, 4, 5]

export {};
