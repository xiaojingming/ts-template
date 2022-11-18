/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
interface F {
  (...res: any[]): any;
}

/**
 * 防抖函数实现
 * @param fn 目标函数
 * @param time 间隔时间
 * @param immediate 是否立即执行
 * @returns 防抖后的目标函数
 */
function debounce1(fn: F, time = 1000, immediate = false) {
  let timer: NodeJS.Timeout | null;
  const context = function f(...res: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      const callNow = !timer;
      if (callNow) {
        fn.apply(this, res);
      }
      timer = setTimeout(() => {
        timer = null;
      }, time);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, res);
      }, time);
    }
  };
  context.cancel = function cancel() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return context;
}

const event = debounce1((e: MouseEvent) => console.log(e.target), 10000, true);
const app = document.querySelector('#app');
const cancel = document.querySelector('#cancel');

if (app && cancel) {
  app.addEventListener('mousemove', event);
  cancel.addEventListener('click', event.cancel);
}

export {};
