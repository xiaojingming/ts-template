// square.js
console.log('加载了 square 模块');

const multiply = require('./multiply.js');

const square = function f(num) {
  return multiply.multiply(num, num);
};

module.exports.square = square;
