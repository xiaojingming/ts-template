/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * 防抖函数的实现，支持立即执行和取消
 * @param fn 目标函数
 * @param time 触发间隔
 * @param immediate 是否立即执行
 * @returns 在立即执行状态下可以存在返回值
 */
function debounce(
  fn: (...res: any[]) => any,
  time = 1000,
  immediate = false,
) {
  let timer: NodeJS.Timeout | null;
  let result: any;
  const ctx = function f(...params: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      const callnow = !timer;
      if (callnow) {
        result = fn.apply(this, params);
      }
      timer = setTimeout(() => {
        timer = null;
      }, time);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, params);
        timer = null;
      }, time);
    }
    return result;
  };
  ctx.cancel = function cancel() {
    if (timer) {
      clearTimeout(timer);
    }
    timer = null;
  };
  return ctx;
}

const app = document.querySelector('#app');
const cancel = document.querySelector('#cancel');
const f = debounce((e: Event) => {
  console.log(e.target, 'move');
}, 1000, true);
const cancelFn = f.cancel;

if (app && cancel) {
  app.addEventListener('mousemove', f);
  cancel.addEventListener('click', cancelFn);
}

export {};
