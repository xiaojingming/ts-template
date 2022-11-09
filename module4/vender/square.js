/* eslint-disable import/first */
/* eslint-disable import/prefer-default-export */
// square.js
console.log('加载了 square 模块');

import { multiply } from './multiply.js';

const square = function f(num) {
  return multiply(num, num);
};

export { square };
