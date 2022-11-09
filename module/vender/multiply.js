/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
// multiply.js
define(function f() {
  console.log('加载了 multiply 模块');
  const multiply = function fn(x, y) {
    return x * y;
  };

  return {
    multiply,
  };
});
