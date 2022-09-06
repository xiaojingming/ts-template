/* eslint-disable no-new */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-assign */
/* eslint-disable vars-on-top */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
interface O {
  [key : string]: any;
}

(function f(context: any) {
  var root = context;
  var cacheMap: O = {};
  var generateName = (function generateName() {
    var sortIndex = 0;
    return function fn(desc: any) {
      sortIndex += 1;
      return '@@' + desc + '_' + sortIndex;
    };
  }());
  var SymbolPolyfill = function Symbol(desc: any) {
    if (this instanceof SymbolPolyfill) {
      throw new TypeError('Symbol is not a constructor');
    }
    var descString = desc === undefined ? undefined : String(desc);
    var symbol = Object.create({
      toString: function toString() {
        // 对象属性与显示转化冲突，只实现对象属性唯一
        // return 'synbol(' + this.__Description__ + ')';
        return this.__Name__;
      },
      // 显示调用valueOf（成功）和隐式调用valueOf（失败）冲突，只实现显示调用成功
      valueOf: function valueOf() {
        return this;
      },
    });
    Object.defineProperties(symbol, {
      __Description__: {
        value: descString,
        writable: false,
        configurable: false,
        enumerable: false,
      },
      __Name__: {
        value: generateName(desc),
        writable: false,
        configurable: false,
        enumerable: false,
      },
    });
    return symbol;
  };
  Object.defineProperties(SymbolPolyfill, {
    for: {
      value: function fn(key: any) {
        var descString = String(key);
        return cacheMap[descString]
          ? cacheMap[descString]
          : (cacheMap[descString] = SymbolPolyfill(key));
      },
      writable: true,
      configurable: true,
      enumerable: false,
    },
    keyFor: {
      value: function fn(symbol: any) {
        for (const key in cacheMap) {
          if (cacheMap[key] === symbol) {
            return cacheMap[key];
          }
        }
      },
      configurable: true,
      writable: true,
      enumerable: false,
    },
  });
  root.SymbolPolyfill = SymbolPolyfill;
}(window));

console.log(String((window as any).SymbolPolyfill('s1')));

const s1 = (window as any).SymbolPolyfill('s1');
const s2 = (window as any).SymbolPolyfill('s1');
const obj: O = {};
obj[s1] = 'xiao';
obj[s2] = 'xjm';
console.log(obj);
console.log(s1.valueOf());
console.log('%c---------------->', 'color: red;');

const s3 = (window as any).SymbolPolyfill.for('sym');
const s4 = (window as any).SymbolPolyfill.for('sym');
console.log(s3 === s4);
console.log((window as any).SymbolPolyfill.keyFor(s3));
export {};
