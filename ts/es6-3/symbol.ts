/* eslint-disable no-restricted-syntax */
/* eslint-disable quote-props */
/* eslint-disable no-undef */
/* eslint-disable no-new */
(function f(context: any) {
  const generateName = (function generateName() {
    let postfix = 0;
    return function gen(desc: string | undefined) {
      postfix += 1;
      return `@@${desc}_${postfix}`;
    };
  }());
  const forMap: any = {};
  const SymbolPolyfill = function Symbol(desc: any) {
    // 实现Symbol不能使用new命令
    if (this instanceof SymbolPolyfill) {
      throw new TypeError('Symbol is not a constructor!');
    }
    // 实现Symbol的参数如果是一个对象，就会调用该对象的toString方法，将其转化成字符串
    const $desc = desc === undefined ? undefined : String(desc);
    const symbol: any = Object.create({
      // 实现Symbol值用于对象的属性名不会重复，但这样就无法实现将Symbol值显式转化为字符串
      toString: function toString() {
        // eslint-disable-next-line no-underscore-dangle
        return `Symbol(${this.__Name__})`;
      },
      // 显式调用与隐式调用只能实现其中一种
      valueOf: function valueOf() {
        return this;
      },
    });
    Object.defineProperties(symbol, {
      '__Description__': {
        value: $desc,
        writable: false,
        configurable: false,
        enumerable: false,
      },
      '__Name__': {
        value: generateName($desc),
        writable: false,
        configurable: false,
        enumerable: false,
      },
    });
    // 实现相同参数的Symbol函数的返回值不相等
    return symbol;
  };
  Object.defineProperties(SymbolPolyfill, {
    'for': {
      value: function forFn(des: any) {
        const key = String(des);
        if (!(key in forMap)) {
          forMap[key] = SymbolPolyfill(des);
        }
        return forMap[key];
      },
      writable: true,
      enumerable: false,
      configurable: true,
    },
    'keyFor': {
      // eslint-disable-next-line consistent-return
      value: function keyFor(sym: any) {
        for (const key in forMap) {
          if (forMap[key] === sym) {
            return key;
          }
        }
      },
      writable: true,
      enumerable: false,
      configurable: true,
    },
  });
  context.SymbolPolyfill = SymbolPolyfill;
}(window));

const a = SymbolPolyfill('xjm');
const b = SymbolPolyfill('xjm');
console.log(a === b); // false;

const obj: any = {};
obj[a] = 'hello';
obj[b] = 'hi';
console.log(obj);

const sym1 = SymbolPolyfill.for('xiao');
console.log(SymbolPolyfill.keyFor(sym1)); // xiao

export {};
