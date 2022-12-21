/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
interface F {
  (...res: any[]): any;
}

const _ = {};

function factorial(n: number): number {
  return n === 1 ? n : n * factorial(n - 1);
}
console.log(factorial(5));

function factorial2(n: number, res: number): number {
  if (n === 1) {
    return res;
  }
  return factorial2(n - 1, n * res);
}
function partial(fn: F, ...res: any[]) {
  let index = 0;
  return function f(...params: any[]) {
    const args: any[] = res.reduce((prev, cur) => {
      prev.push(cur === _ ? params[index++] : cur);
      return prev;
    }, []);
    while (index < params.length) {
      args.push(params[index++]);
    }
    return fn.apply(this, args);
  };
}

const factorial2Partial = partial(factorial2, _, 1);
console.log(factorial2Partial(5)); // 120

export {};
