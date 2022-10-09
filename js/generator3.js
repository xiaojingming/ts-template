/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-return */
import fetch from 'node-fetch';

function thunkToPromise(fn) {
  return new Promise((resolve, reject) => {
    fn((err, res) => {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    });
  });
}
function isPromise(target) {
  return typeof target.then === 'function';
}
function toPromise(target) {
  if (isPromise(target)) {
    return target;
  }
  if (typeof target === 'function') {
    return thunkToPromise(target);
  }
  return target;
}
function* gen() {
  const url1 = 'https://api.github.com/users/github';
  const url2 = 'https://api.github.com/users/github/followers';
  const url3 = 'https://api.github.com/users/github/repos';
  const r1 = yield fetch(url1);
  const r2 = yield fetch(url2);
  const r3 = yield fetch(url3);
  console.log([r1.bio, r2[0].login, r3[0].full_name].join('\n'));
}

// const it = gen();
// it.next().value
//   .then((res) => res.json())
//   .then((v) => it.next(v).value)
//   .then((res) => res.json())
//   .then((v) => it.next(v).value)
//   .then((res) => res.json())
//   .then((v) => it.next(v));

function run(g) {
  const it = g();
  function next(v) {
    const res = it.next(v);
    if (res.done) {
      return;
    }
    res.value.then((val) => val.json())
      .then((val) => next(val));
  }
  next();
}

// run(gen);

function* gen2() {
  const r1 = yield fetch('https://api.github.com/users/github');
  const json1 = yield r1.json();
  const r2 = yield fetch('https://api.github.com/users/github/followers');
  const json2 = yield r2.json();
  const r3 = yield fetch('https://api.github.com/users/github/repos');
  const json3 = yield r3.json();
  console.log([json1.bio, json2[0].login, json3[0].full_name].join('\n'));
}

// const it2 = gen2();
// it2.next().value
//   .then((res) => it2.next(res).value)
//   .then((res) => it2.next(res).value)
//   .then((res) => it2.next(res).value)
//   .then((res) => it2.next(res).value)
//   .then((res) => it2.next(res).value)
//   .then((res) => it2.next(res));

function run2(g) {
  const it = g();
  function next(data) {
    const res = it.next(data);
    if (res.done) {
      return;
    }
    res.value.then((value) => next(value));
  }
  next();
}
// run2(gen2);

// function fetchData(url, cb) {
//   setTimeout(() => {
//     cb({ status: 200, data: url });
//   }, 1000);
// }

function fetchData(url) {
  return function fn(cb) {
    setTimeout(() => {
      cb(null, { status: 200, data: url });
    }, 1000);
  };
}

function* gen3() {
  const r1 = yield fetchData('https://api.github.com/users/github');
  const r2 = yield fetchData('https://api.github.com/users/github/followers');
  console.log([r1.data, r2.data].join('\n'));
}

// const it3 = gen3();
// it3.next().value((v) => {
//   it3.next(v).value((val) => {
//     it3.next(val);
//   });
// });

function run3(g) {
  const it = g();
  function next(v) {
    const res = it.next(v);
    if (res.done) {
      return;
    }
    if (isPromise(res.value)) {
      res.value.then((val) => next(val));
    } else {
      res.value(next);
    }
  }
  next();
}

// run3(gen3);

function run4(g) {
  const it = g();
  return new Promise((resolve, reject) => {
    let res;
    function next(data) {
      try {
        res = it.next(data);
      } catch (e) {
        return reject(e);
      }
      if (res.done) {
        return resolve(res.value);
      }
      const value = toPromise(res.value);
      value.then((v) => {
        next(v);
      }, (e) => reject(e));
    }
    next();
  });
}

run4(gen3);
