/* eslint-disable no-param-reassign */
/* eslint-disable no-eval */
/* eslint-disable prefer-template */
/* eslint-disable prefer-rest-params */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
const foo = {
  value: 1,
};

function bar(a: number, b: number) {
  return this.value + a + b;
}
// bar.call(foo); // 1

function myCall(context: any) {
  var ctx = context || window;
  ctx.fn = this;
  var args: any[] = [];
  for (var i = 1; i < arguments.length; i += 1) {
    args.push('arguments[' + i + ']');
  }
  var res = eval('ctx.fn(' + args + ')');
  delete ctx.fn;
  return res;
}

function myApply(context: any, params: any[]) {
  context = context || window;
  context.fn = this;
  var res: any;
  if (params.length > 0) {
    var args: any[] = [];
    for (var i = 0; i < params.length; i += 1) {
      args.push('params[' + i + ']');
    }
    res = eval('context.fn(' + args + ')');
  } else {
    res = context.fn();
  }
  delete context.fn;
  return res;
}

(Function.prototype as any).myCall = myCall;
(Function.prototype as any).myApply = myApply;
console.log((bar as any).myCall(foo, 2, 3)); // 6
console.log((bar as any).myApply(foo, [3, 4])); // 8

export {};
