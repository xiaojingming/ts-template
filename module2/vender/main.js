/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-arrow-callback */
// main.js
define(function f(require, exports, module) {
  const addModule = require('./add');
  console.log(addModule.add(1, 1));

  const squareModule = require('./square');
  console.log(squareModule.square(3));
});
