// add.js
console.log('加载了 add 模块');

const add = function f(x, y) {
  return x + y;
};

module.exports.add = add;
