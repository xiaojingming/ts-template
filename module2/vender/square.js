/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-arrow-callback */
define(function f(require, exports, module) {
  console.log('加载了 square 模块');
  const multiplyModule = require('./multiply');
  module.exports = {
    square(num) {
      return multiplyModule.multiply(num, num);
    },
  };
});
