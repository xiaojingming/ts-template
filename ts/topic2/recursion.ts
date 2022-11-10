/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// function factorial(n: number): number {
//   return n === 1 ? n : n * factorial(n - 1);
// }
// console.log(factorial(5)); // 120

// function fib(n: number): number {
//   return n < 2 ? n : fib(n - 1) + fib(n - 2);
// }
// console.log(fib(10)); // 55
interface F {
  (...res: any[]): any;
}

const _ = {};
function factorial(n: number, res: number): number {
  if (n === 1) {
    return res;
  }
  return factorial(n - 1, res * n);
}

function partial(f: F, ...params: any[]) {
  const arg: any[] = [];
  let index = 0;
  return function fn(...res: any[]) {
    for (let i = 0; i < params.length; i += 1) {
      const val = params[i];
      arg.push(val === _ ? res[index++] : val);
    }
    while (res.length > index) {
      arg.push(res[index++]);
    }
    return f.apply(this, arg);
  };
}

const pFactorial = partial(factorial, _, 1);
console.log(pFactorial(5)); // 120

export {};
