/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
// add.js
define(function f(require, exports, module) {
  console.log('加载了 add 模块');
  const add = function fn(x, y) {
    return x + y;
  };
  module.exports = {
    add,
  };
});
