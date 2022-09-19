/* eslint-disable no-eval */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
const foo = {
  value: 1,
};
function bar(name: string, age: number) {
  console.log(name, age);
  return this.value;
}

function myCall(target: any = window) {
  target.fn = this;
  const params: any[] = [];
  for (let i = 1; i < arguments.length; i += 1) {
    params.push(`arguments[${i}]`);
  }
  const res = eval(`target.fn(${params})`);
  delete target.fn;
  return res;
}
(Function.prototype as any).myCall = myCall;
console.log((bar as any).myCall(foo, 'xiao', 25)); // 1

function myApply(target: any = window, params: any[] = []) {
  target.fn = this;
  let result: any;
  if (params.length === 0) {
    result = target.fn();
  } else {
    const res: any[] = [];
    for (let i = 0; i < params.length; i += 1) {
      res.push(`params[${i}]`);
    }
    result = eval(`target.fn(${res})`);
  }
  delete target.fn;
  return result;
}
(Function.prototype as any).myApply = myApply;
console.log((bar as any).myApply(foo, ['xiao', 25])); // 1
export {};
