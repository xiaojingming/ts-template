/* eslint-disable no-unused-vars */
interface F {
  (...res: any): any
}
function debounce(fn: F, time = 1000, immediate = false) {
  // eslint-disable-next-line no-undef
  let timer: NodeJS.Timeout | null;
  const debounced = function f(...res: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, time);
      if (callNow) {
        fn.apply(this, res);
      }
    } else {
      timer = setTimeout(() => {
        fn.apply(this, res);
      }, time);
    }
  };
  debounced.cancel = function cancel() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debounced;
}

const app = document.querySelector('#app');
const cancel = document.querySelector('#cancel');
const moveFn = debounce((e) => {
  console.log('move', e);
}, 10000, true);

if (app && cancel) {
  app.addEventListener('mousemove', moveFn);
  cancel.addEventListener('click', moveFn.cancel);
}

export {};
