/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-arrow-callback */
define(function f(require, exports, module) {
  console.log('加载了 multiply 模块');
  const multiply = function fn(x, y) {
    return x * y;
  };
  module.exports = {
    multiply,
  };
});
