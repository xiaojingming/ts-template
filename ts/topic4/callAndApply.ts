/* eslint-disable no-param-reassign */
/* eslint-disable no-eval */
/* eslint-disable prefer-template */
/* eslint-disable prefer-rest-params */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
interface F extends Function {
  myCall: (...params: any[]) => any;
  myApply: (...param: any[]) => any;
}

const foo = {
  value: 1,
};

function bar(a: number, b: number) {
  return this.value + a + b;
}
function myCall(context: any) {
  context = context || window;
  context.fn = this;
  var params: any[] = [];
  for (var i = 1; i < arguments.length; i += 1) {
    params.push('arguments[' + i + ']');
  }
  var result = eval('context.fn(' + params + ')');
  delete context.fn;
  return result;
}
function myApply(context: any, params?: any[]) {
  context = context || window;
  context.fn = this;
  var result: any;
  if (!params) {
    result = context.fn();
  } else {
    var $params: any[] = [];
    for (var i = 0; i < params.length; i += 1) {
      $params.push('params[' + i + ']');
    }
    result = eval('context.fn(' + $params + ')');
  }
  delete context.fn;
  return result;
}

(Function.prototype as F).myCall = myCall;
(Function.prototype as F).myApply = myApply;
console.log((bar as unknown as F).myCall(foo, 2, 3));
console.log((bar as unknown as F).myApply(foo, [2, 3]));

export {};
