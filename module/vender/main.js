/* eslint-disable no-debugger */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-amd */
// main.js
require(['./add', './square'], function f(addModule, squareModule) {
  console.log(addModule.add(1, 1));
  console.log(squareModule.square(3));
});
