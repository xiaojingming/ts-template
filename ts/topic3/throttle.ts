/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
interface F {
  (...res: any[]): any
}

interface Options {
  leading: boolean, // 是否禁用第一次回调
  trailing: boolean, // 是否禁用停止触发的回调
}

/**
 * 通过时间戳实现节流函数
 * @param f 目标函数
 * @param time 节流时间间隔
 * @returns 节流后的目标函数
 */
function throttle1(f: F, time = 1000) {
  let prev = 0;
  return function fn(...params: any[]) {
    const now = Date.now();
    if (now - prev > time) {
      f.apply(this, params);
      prev = now;
    }
  };
}

/**
 * 通过定时器实现节流函数
 * @param f 目标函数
 * @param time 防抖时间间隔
 * @returns 防抖后的目标函数
 */
function throttle2(f: F, time = 1000) {
  let timer: NodeJS.Timeout | null;
  return function fn(...params: any[]) {
    if (!timer) {
      timer = setTimeout(() => {
        f.apply(this, params);
        timer = null;
      }, time);
    }
  };
}

function throttle3(f: F, time = 1000) {
  let timer: NodeJS.Timeout | null;
  let prev = 0;
  return function fn(...params: any[]) {
    const now = Date.now();
    if (timer) {
      clearTimeout(timer);
    }
    if (now - prev > time) {
      f.apply(this, params);
      prev = now;
    } else {
      timer = setTimeout(() => {
        f.apply(this, params);
        prev = Date.now();
      }, time);
    }
  };
}

function throttle4(
  f: F,
  time = 1000,
  { leading, trailing }: Options = {
    leading: true,
    trailing: true,
  },
) {
  let timer: NodeJS.Timeout | null;
  let prev = 0;
  const ctx = function fn(...params: any[]) {
    const now = Date.now();
    if ((now - prev > time) && leading) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      f.apply(this, params);
      prev = Date.now();
    } else if (!timer && trailing) {
      timer = setTimeout(() => {
        f.apply(this, params);
        prev = Date.now();
        timer = null;
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

const app = document.querySelector('#app');
const cancel = document.querySelector('#cancel');
// const action = throttle1((e: MouseEvent) => console.log(e.target));
// const action = throttle2((e: MouseEvent) => console.log(e.target));
// const action = throttle3((e: MouseEvent) => console.log(e.target));
const action = throttle4((e: MouseEvent) => console.log(e.target), 10000, {
  leading: true,
  trailing: true,
});
if (app && cancel) {
  app.addEventListener('mousemove', action);
  cancel.addEventListener('click', action.cancel);
}

export {};
