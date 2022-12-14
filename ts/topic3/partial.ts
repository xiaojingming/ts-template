/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
interface F {
  (...res: any[]): any;
}

const _ = {};

function partial(fn: F, ...params: any[]) {
  const args: any[] = [];
  return function f(...subParams: any[]) {
    let index = 0;
    for (let i = 0; i < params.length; i += 1) {
      const val = params[i];
      args.push(val === _ ? subParams[index++] : val);
    }
    while (index < subParams.length) {
      args.push(subParams[index++]);
    }
    return fn.apply(this, args);
  };
}

const substract = (a: number, b: number, c: number) => c - b - a;
const substractPartial = partial(substract, _, 20, _);
console.log(substractPartial(5, 30)); // 5

export {};
