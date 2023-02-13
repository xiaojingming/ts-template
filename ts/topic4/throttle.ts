/* eslint-disable no-debugger */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * 通过时间戳实现节流（立即执行，结束不执行）
 * @param fn 目标函数
 * @param time 间隔时间
 * @returns 节流后的函数
 */
function throttle1(fn: (...params: any[]) => any, time = 1000) {
  let prev = 0;
  return function f(...res: any[]) {
    const now = Date.now();
    if (now - prev > time) {
      fn.apply(this, res);
      prev = Date.now();
    }
  };
}
/**
 * 通过定时器实现节流（首次不会立即执行，结束执行）
 * @param fn 目标函数
 * @param time 间隔时间
 * @returns 节流后的函数
 */
function throttle2(fn: (...params: any[]) => any, time = 1000) {
  let timer: NodeJS.Timeout | null;
  return function f(...res: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, res);
        timer = null;
      }, time);
    }
  };
}
/**
 * 通过定时器+时间戳实现节流（立即执行+结束执行）
 * @param fn 目标函数
 * @param time 间隔时间
 * @returns 节流后的函数
 */
function throttle3(fn: (...params: any[]) => any, time = 1000) {
  let timer: NodeJS.Timeout | null;
  let prev = 0;
  return function f(...res: any[]) {
    const now = Date.now();
    if (now - prev > time) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, res);
      prev = Date.now();
    } else if (!timer) {
      // 最后一次才执行
      timer = setTimeout(() => {
        fn.apply(this, res);
        timer = null;
        prev = Date.now();
      }, time);
    }
  };
}
function throttle(
  fn: (...res: any[]) => any,
  time = 1000,
  option = {
    leading: true, // 是否立即执行
    trailing: false, //  是否触发离开回调
  },
) {
  let timer: NodeJS.Timeout | null;
  let prev = 0;
  const ctx = function f(...res: any[]) {
    const now = Date.now();
    if ((now - prev > time) && option.leading) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      fn.apply(this, res);
      prev = Date.now();
    } else if (!timer && option.trailing) {
      timer = setTimeout(() => {
        fn.apply(this, res);
        timer = null;
        prev = Date.now();
      }, time);
    }
  };
  ctx.cancel = function cancel() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    prev = 0;
  };
  return ctx;
}
// const fn = throttle1((e: Event) => {
//   console.log(e.target, 'move');
// });
// const fn = throttle2((e: Event) => {
//   console.log(e.target, 'move');
// });
// const fn = throttle3((e: Event) => {
//   console.log(e.target, 'move');
// });
const fn = throttle((e: Event) => {
  console.log(e.target, 'move');
}, 1000, {
  leading: true,
  trailing: true,
});
const { cancel } = fn;
const app = document.querySelector('#app');
const cancelBtn = document.querySelector('#cancel');
if (app && cancelBtn) {
  app.addEventListener('mousemove', fn);
  cancelBtn.addEventListener('click', cancel);
}

export {};
