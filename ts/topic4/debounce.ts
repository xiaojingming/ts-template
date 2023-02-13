/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/**
 * 防抖函数实现
 * @param f 目标执行函数
 * @param time 定时器时间间隔
 * @param immediate 是否立即执行
 * @returns 防抖后的目标函数
 */
function debounce(f: (...res: any[]) => any, time: number, immediate: boolean) {
  let timer: NodeJS.Timeout | null;
  const ctx = function fn(...params: any[]) {
    let result: any;
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      const callNow = !timer;
      if (callNow) {
        result = f.apply(this, params);
      }
      timer = setTimeout(() => {
        timer = null;
      }, time);
    } else {
      timer = setTimeout(() => {
        f.apply(this, params);
        timer = null;
      }, time);
    }
    return result;
  };
  ctx.cancel = function cancel() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return ctx;
}

const app = document.getElementById('app');
const cancel = document.getElementById('cancel');
const moveAction = debounce((e: MouseEvent) => {
  console.log(e.target, 'mover');
}, 10000, true);

if (app && cancel) {
  app.addEventListener('mousemove', moveAction);
  cancel.addEventListener('click', moveAction.cancel);
}

export {};
