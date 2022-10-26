/* eslint-disable no-param-reassign */
/* eslint-disable no-eval */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-template */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
interface Mfn extends Function {
  myCall(...res: any[]): any;
  myApply(...res: any[]): any;
}

const foo = {
  value: 10,
};

function f(a: number, b: number) {
  return this.value + a + b;
}

function myCall(context: any) {
  context = context || window;
  var params = [];
  var i = 1;
  context.fn = this;
  for (; i < arguments.length; i += 1) {
    params.push('arguments[' + i + ']');
  }
  var res = eval('context.fn(' + params + ')');
  delete context.fn;
  return res;
}

function myApply(context: any, params: any[]) {
  context = context || window;
  context.fn = this;
  var res;
  if (params && params.length !== 0) {
    var $params = [];
    for (var i = 0; i < params.length; i += 1) {
      $params.push('params[' + i + ']');
    }
    res = eval('context.fn(' + params + ')');
  } else {
    res = context.fn();
  }
  delete context.fn;
  return res;
}

(Function.prototype as Mfn).myCall = myCall;
(Function.prototype as Mfn).myApply = myApply;
console.log((f as unknown as Mfn).myCall(foo, 20, 30)); // 60
console.log((f as unknown as Mfn).myApply(foo, [20, 30])); // 60
export {};
