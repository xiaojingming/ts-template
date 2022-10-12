/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
interface F {
  (...res: any[]): any;
}
interface Options {
  leading: boolean; // 第一次是否执行
  trailing: boolean; // 最后一次是否执行
}
interface Ins {
  (...res: any[]): void;
  cancel(): void;
}
// interface Throttle {
//   (f: F, time: number): (...res: any[]) => void;
//   (f: F, time: number, options: Options): Ins;
// }
function throttle(f: F, time: number, options: Options): Ins;

// 使用时间戳
// function throttle(f: F, time = 1000) {
//   let prev = 0;
//   return function fn(...res: any[]) {
//     const now = Date.now();
//     if (now - prev > time) {
//       f.apply(this, res);
//       prev = now;
//     }
//   };
// }
// 使用定时器
// function throttle(f: F, time = 1000) {
//   let timer: NodeJS.Timeout | null;
//   return function fn(...res: any[]) {
//     if (!timer) {
//       timer = setTimeout(() => {
//         f.apply(this, res);
//         timer = null;
//       }, time);
//     }
//   };
// }
// 时间戳+定时器
// function throttle(fn: F, time = 2000) {
//   let prev = 0;
//   let timer: NodeJS.Timeout | null;
//   return function f(...res: any[]) {
//     const now = Date.now();
//     if (now - prev > time) {
//       if (timer) {
//         clearTimeout(timer);
//         timer = null;
//       }
//       prev = now;
//       fn.apply(this, res);
//     } else if (!timer) {
//       timer = setTimeout(() => {
//         f.apply(this, res);
//         timer = null;
//         prev = now;
//       }, time);
//     }
//   };
// }
// 时间戳+定时器的优化
function throttle(
  f: F,
  time: number,
  options: Options = {
    leading: true,
    trailing: true,
  },
) {
  let prev = 0;
  let timer: NodeJS.Timeout | null;
  const ins = function fn(...res: any[]) {
    const now = Date.now();
    if ((now - prev > time) && options?.leading) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      prev = now;
      f.apply(this, res);
    } else if (!timer && options?.trailing) {
      timer = setTimeout(() => {
        f.apply(this, res);
        timer = null;
        prev = now;
      }, time);
    }
  };
  ins.cancel = function cancel() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    prev = 0;
  };
  return ins;
}

const app = document.querySelector('#app');
const cancelBtn = document.querySelector('#cancel');
const action = throttle((e) => {
  console.log(e, 'action');
}, 10000, {
  leading: true,
  trailing: false,
});
if (app && cancelBtn) {
  app.addEventListener('mousemove', action);
  cancelBtn.addEventListener('click', action.cancel);
}

export { };
