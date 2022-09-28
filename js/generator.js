/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
import fetch from 'node-fetch';

function isPromise(target) {
  return 'then' in target && typeof target.then === 'function';
}

function* gen() {
  const url1 = 'https://api.github.com/users/github';
  const url2 = 'https://api.github.com/users/github/followers';
  const url3 = 'https://api.github.com/users/github/repos';
  const result1 = yield fetch(url1);
  const json1 = yield result1.json();
  const result2 = yield fetch(url2);
  const json2 = yield result2.json();
  const result3 = yield fetch(url3);
  const json3 = yield result3.json();
  // console.log([result1.bio, result2[0].login, result3[0].full_name].join('\n'));
  console.log([json1.bio, json2[0].login, json3[0].full_name].join('\n'));
}
// const it = gen();
// it.next().value
//   .then((res) => it.next(res).value)
//   .then((res) => it.next(res).value)
//   .then((res) => it.next(res).value)
//   .then((res) => it.next(res).value)
//   .then((res) => it.next(res).value)
//   .then((res) => it.next(res));

function run1(g) {
  const it = g();
  function next(v) {
    const res = it.next(v);
    if (res.done) {
      return;
    }
    res.value
      .then((data) => next(data));
  }
  next();
}

// run1(gen);
function fetchData(url) {
  return function f(cb) {
    setTimeout(() => cb({ status: 200, data: url }), 1000);
  };
}
function* gen2() {
  const r1 = yield fetchData('https://api.github.com/users/github');
  const r2 = yield fetchData('https://api.github.com/users/github/followers');
  console.log([r1.data, r2.data].join('\n'));
}

// const it2 = gen2();
// it2.next().value
//   .then((res) => res.json())
//   .then((res) => it2.next(res).value)
//   .then((res) => res.json())
//   .then((res) => it2.next(res));
// const it2 = gen2();
// it2.next().value((data1) => {
//   it2.next(data1).value((data2) => {
//     it2.next(data2);
//   });
// });

function run2(g) {
  const it = g();
  function next(data) {
    const res = it.next(data);
    if (res.done) {
      return;
    }
    res.value((val) => next(val));
  }
  next();
}

// run2(gen2);

function run(g) {
  const it = g();
  function next(data) {
    const res = it.next();
    if (res.done) {
      return;
    }
    if (isPromise(res.value)) {
      res.value
        .then((v) => it.next(v));
    } else {
      res.value((v) => it.next(v));
    }
  }
  next();
}
