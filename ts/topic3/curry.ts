/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
interface F {
  (...params: any[]): any;
}

const _ = {};

function subCurry(fn: F, ...params: any[]) {
  return function f(...subParams: any[]) {
    return fn.apply(this, params.concat(subParams));
  };
}

function add(a: number, b: number) {
  return a + b;
}

// const addCurry = subCurry(add);
// console.log(addCurry(1, 2)); // 3
// const addCurry = subCurry(add, 1);
// console.log(addCurry(2)); // 3
// const addCurry = subCurry(add, 1, 2);
// console.log(addCurry()); // 3

function curry(fn: F, length = fn.length) {
  return function f(...params: any[]) {
    if (params.length >= length) {
      return fn.apply(this, params);
    }
    return curry(subCurry.apply(this, [fn, ...params]), length - params.length);
  };
}

const adds = (a: number, b: number, c: number, d: number) => a + b + c + d;
const addsCurry = curry(adds);
// console.log(addsCurry(1, 2)(3, 4)); // 10
console.log(addsCurry(1)(2)(3)(4)); // 10

function curry2(fn: F, args: any[] = []) {
  return function f(...params: any[]) {
    let $args = args.slice(0);
    $args = $args.concat(params);
    if ($args.length >= fn.length) {
      return fn.apply(this, $args);
    }
    return curry2(fn, $args);
  };
}

const addsCurry2 = curry2(adds);
console.log(addsCurry2(1, 2)(3, 4)); // 10
console.log('%c---------------->', 'color: red;');

function curry3(
  fn: F,
  args: any[] = [],
  holes: any[] = [],
) {
  const { length } = fn;
  return function f(...params: any[]) {
    const $args = args.slice(0);
    const $holes = holes.slice(0);
    const { length: argsLength } = args;
    const { length: holesLength } = holes;
    let index = 0;
    for (let i = 0; i < params.length; i += 1) {
      const val = params[i];
      if (holesLength && val === _) {
        index += 1;
        if (index > holesLength) {
          $args.push(val);
          $holes.push(argsLength - 1 + index - holesLength);
        }
      } else if (val === _) {
        $args.push(val);
        $holes.push(argsLength + i);
      } else if (holesLength) {
        if (index >= holesLength) {
          $args.push(val);
        } else {
          $args.splice($holes[index], 1, val);
          $holes.splice(index, 1);
        }
      } else {
        $args.push(val);
      }
    }
    if ($holes.length || $args.length < length) {
      return curry3.call(this, fn, $args, $holes);
    }
    return fn.apply(this, $args);
  };
}

const foo = <T>(a: T, b: T, c: T, d: T, e: T) => {
  console.log([a, b, c, d, e]);
};
const fooCurry = curry3(foo);
fooCurry(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]
fooCurry(_, 2, 3, 4, 5)(1); // [1, 2, 3, 4, 5]
fooCurry(1, _, 3, 4, 5)(2); // [1, 2, 3, 4, 5]
fooCurry(1, _, 3)(_, 4)(2)(5); // [1, 2, 3, 4, 5]
fooCurry(1, _, _, 4)(_, 3)(2)(5); // [1, 2, 3, 4, 5]
fooCurry(_, 2)(_, _, 4)(1)(3)(5); // [1, 2, 3, 4, 5]

export {};
