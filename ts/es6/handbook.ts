/* eslint-disable no-eval */
/* eslint-disable no-unused-vars */
interface O {
  [key: string]: any
}

function fn() {
  console.log('xxxxx');
}
const obj: O = {};

const a = {
  duration: 50,
  title: false,
};

// a.duration ||= 100;
// a.title ??= 'xxxxxx';
// console.log(a.title);

const double = (n: number) => n * 2;
const increment = (n: number) => n + 1;
console.log(double(increment(double(5))));

// console.log(5 |> double |> increment |> double);

export {};
