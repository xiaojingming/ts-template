// main.js
// const add = require('./add.js');

// console.log(add.add(1, 1));

// const square = require('./square.js');

// console.log(square.square(3));

const mod = require('./counter');

console.log(mod.counter.value); // 3
mod.incCounter();
console.log(mod.counter.value); // 4
