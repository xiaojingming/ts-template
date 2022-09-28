let z = 1;
function* foo() {
  const x = yield 2;
  z += 1;
  const y = yield (x * 2);
  console.log(x, y, z);
}

const it1 = foo();
const it2 = foo();
let val1 = it1.next().value; // 2
let val2 = it2.next().value; // 2
val1 = it1.next(val2 * 10).value; // x: 20 val1: 40
val2 = it2.next(val1 * 5).value; // x: 200 val2: 400
it1.next(val2 / 2); // x: 20 y: 200 z: 3
it2.next(val1 / 4); // x: 200 y: 10 z: 3
