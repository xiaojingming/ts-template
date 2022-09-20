/* eslint-disable no-unused-vars */
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}
function light(fn: () => void, time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, time);
  });
}
const p1: any = () => Promise.resolve()
  .then(() => light(red, 3000))
  .then(() => light(green, 2000))
  .then(() => light(yellow, 1000))
  .then(p1);

// p1();
export {};
