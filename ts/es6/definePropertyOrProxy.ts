/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
// const obj = {
//   value: 1,
// };
const obj = {
  value: 1,
};
const btn = document.querySelector('#add');
const span = document.querySelector('span');

// Object.defineProperty(obj, 'value', {
//   get() {
//     return value;
//   },
//   set(v: number) {
//     value = v;
//     if (btn && span) {
//       span.innerHTML = `${value}`;
//     }
//   },
// });
(function foo(context: any) {
  function watch<T extends Object>(target: T, f: (newV: T[keyof T], key: keyof T) => void) {
    // Object.defineProperty(target, name, {
    //   get() {
    //     return val;
    //   },
    //   set(v) {
    //     val = v;
    //     f(val);
    //   },
    // });
    const proxy = new Proxy(target, {
      get(t: typeof target, k: keyof typeof t & string) {
        return t[k];
      },
      set(t: typeof target, k: keyof typeof t & string, v: any) {
        t[k] = v;
        f(v, k);
        return true;
      },
    });
    return proxy;
  }
  context.watch = watch;
}(window));

if (btn && span) {
  const newObject = (window as any).watch(obj, (v: any, k: string) => {
    if (k === 'value') {
      span.innerHTML = v;
    }
  });
  btn.addEventListener('click', () => {
    newObject.value += 1;
  });
}

export {};
