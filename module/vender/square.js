/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-amd */
// square.js
define(['./multiply'], function f(multiplyModule) {
  console.log('加载了 square 模块');
  return {
    square(num) {
      return multiplyModule.multiply(num, num);
    },
  };
});
