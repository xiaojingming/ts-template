/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
class Math {
  @log('add')
  add(a: number, b: number) {
    return a + b;
  }
}

// function log(target: Math, name: keyof Math, descriptor: PropertyDescriptor) {
//   const oldVal = descriptor.value;
//   descriptor.value = function f(...args: any[]) {
//     console.log(`Calling ${name} with`, args);
//     return (oldVal as (...res: number[]) => number).apply(this, args);
//   };
//   return descriptor;
// }

function log(type: string) {
  return (target: Math, name: keyof Math, descriptor: PropertyDescriptor) => {
    const oldVal = descriptor.value;
    descriptor.value = (...params: any[]) => {
      console.log(`(${type})正在执行：${name}(${params}) = ?`);
      let result: any;
      try {
        result = (oldVal as (...res: any[]) => any).apply(this, params);
        console.log(`(${type})成功：${name}(${params}) => ${result}`);
      } catch (err) {
        console.log(`(${type})失败：${name}(${params}) => ${err}`);
      }
      return result;
    };
  };
}

const math = new Math();
console.log(math.add(2, 4)); // 6
console.log('%c---------------->', 'color: red;');

class Toggle {
  // @autoBind
  @debounce(1000, true)
  handleClick() {
    console.log(this);
    // return this;
  }

  @getTime()
  handleCilckTo() {
    console.log(this);
  }

  render() {
    return (
      `<button onClick={this.handleClick}>
        button
      </button>`
    );
  }
}

const { defineProperty, getPrototypeOf } = Object;

function bind(fn: any, context: any) {
  if (fn.bind) {
    return fn.bind(context);
  }
  return function __autoBind__(...params: any[]) {
    return fn.apply(context, params);
  };
}

function autoBind(
  target: typeof Toggle.prototype,
  name: keyof Toggle,
  descriptor: PropertyDescriptor,
) {
  const { value, configurable, enumerable } = descriptor;
  if (typeof value !== 'function') {
    throw new SyntaxError(`@autoBind can only be used on functions, not: ${value}`);
  }
  // const { constructor } = target;
  return {
    configurable,
    enumerable,
    get() {
      if (this === target) {
        return value;
      }
      const boundFn = bind(value, this);
      defineProperty(this, name, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: boundFn,
      });
      return boundFn;
    },
    set(newV: any) {
      defineProperty(this, name, {
        configurable: true,
        writable: true,
        enumerable: true,
        value: newV,
      });
    },
  };
}

function _debounce(fn: (...res: any[]) => void, time = 1000, immediate = false) {
  let timer: NodeJS.Timeout | null;
  return function f(...res: any[]) {
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
        timer = null;
      }, time);
    }
  };
}

// 防抖
function debounce(time: number, immediate: boolean) {
  return (target: typeof Toggle.prototype, name: keyof Toggle, descriptor: PropertyDescriptor) => {
    const { value } = descriptor;
    if (typeof value !== 'function') {
      throw new SyntaxError('Only functions can be debounced');
    }
    descriptor.value = _debounce.call(this, value, time, immediate);
    return descriptor;
  };
}

// 获取执行时间
function getTime(prefix?: string) {
  let count = 0;
  return function handleDecorator(
    target: typeof Toggle.prototype,
    name: keyof Toggle,
    descriptor: PropertyDescriptor,
  ) {
    const { value: fn } = descriptor;
    if (!prefix) {
      prefix = `${target.constructor.name}${name}`;
    }
    if (typeof fn !== 'function') {
      throw new SyntaxError(`@time can only be used on functions, not: ${fn}`);
    }
    return {
      ...descriptor,
      value() {
        const label = `${prefix}-${name}`;
        count += 1;
        console.time(label);
        try {
          return fn.apply(this);
        } finally {
          console.timeEnd(label);
        }
      },
    };
  };
}

const t1 = new Toggle();
const btn = document.querySelector('#btn');
if (btn) {
  btn.addEventListener('click', t1.handleCilckTo);
}

console.log('%c---------------->', 'color: red;');

const SingerMixin = {
  sing(sound: string) {
    alert(sound);
  },
};

const FlyMixin = {
  get speed() {
    return 'speed';
  },
  fly() {},
  land() {},
};

@mixin(SingerMixin, FlyMixin)
class Bird {
  singMatingCall(this : { sing(str: string): void }) {
    this.sing('tweet tweet');
  }
}

function mixin(...mixins: any[]) {
  return (target: new (...res: any[]) => any) => {
    if (!mixins.length) {
      throw new SyntaxError(`@mixin() class ${target.name} requires at least one mixin as an argument`);
    }
    mixins.forEach((item) => {
      // 获取所有属性描述符
      const desc = Object.getOwnPropertyDescriptors(item);
      // 获取所有的属性名
      const names = Object.getOwnPropertyNames(desc);
      names.forEach((name) => {
        if (!Object.prototype.hasOwnProperty.call(target, name)) {
          Object.defineProperty(target.prototype, name, desc[name]);
        }
      });
    });
  };
}

const b1 = new Bird();
(b1 as any).singMatingCall();

export {};
