/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-return-assign */
/* eslint-disable vars-on-top */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
interface TypeSymbol {
  __Description__: undefined | string;
  __Name__: string;
}
interface TypeSymbolPolyfill {
  SymbolPolyfill(desc: any): TypeSymbol;
}
interface O {
  [key: string]: any;
}

(function f(context: any) {
  var root = context;
  var forMap: O = {};
  var generateName = (function generateName() {
    var postfix = 0;
    return function subGenName(desc: string | undefined) {
      postfix += 1;
      return '@@' + desc + '_' + postfix;
    };
  }());
  var SymbolPolyfill = function Symbol(description: any) {
    // 参数是对象则调用toString转化，(可以显示转化为String与对象属性冲突，只能实现一种情况)
    var decString = description === undefined ? undefined : String(description);
    var symbol = Object.create({
      toString: function toString() {
        return this.__Name__;
      },
      // Symbol的值不能与其它类型进行运算，Symbol可以调用valueOf（二者只能选择一个实现，因为我们不发判断是显示还是隐式的调用）
      valueOf: function valueOf() {
        return this;
      },
    });
    // 不能通过new调用
    if (this instanceof Symbol) {
      throw new TypeError('Symbol is not a constructor');
    }
    Object.defineProperties(symbol, {
      __Description__: {
        value: decString,
        writable: false,
        enumerable: false,
        configurable: false,
      },
      __Name__: {
        value: generateName(decString),
        writable: false,
        configurable: false,
        enumerable: false,
      },
    });
    // 相同description创建的symbol不相等
    return symbol;
  };
  Object.defineProperties(SymbolPolyfill, {
    for: {
      value: function fn(description: any) {
        var key = description === undefined ? undefined : String(description);
        return forMap[description as unknown as string]
          ? forMap[description as unknown as string]
          : (forMap[description as unknown as string] = SymbolPolyfill(key));
      },
      writable: true,
      configurable: true,
      enumerable: false,
    },
    keyFor: {
      value: function fn(symbol: TypeSymbol) {
        for (const key in symbol) {
          if (forMap[key] === symbol) {
            return key;
          }
        }
      },
      writable: true,
      configurable: true,
      enumerable: false,
    },
  });
  root.SymbolPolyfill = SymbolPolyfill;
}(window));
console.log((window as unknown as TypeSymbolPolyfill).SymbolPolyfill('s1'));
console.log(String((window as unknown as TypeSymbolPolyfill).SymbolPolyfill('s1')));

var a = (window as unknown as TypeSymbolPolyfill).SymbolPolyfill('a');
var b = (window as unknown as TypeSymbolPolyfill).SymbolPolyfill('a');
const obj: O = {};
obj[a.toString()] = 'xiao';
obj[b.toString()] = 'xjm';
console.log(obj); // {@@a_3: 'xiao', @@a_4: 'xjm'}
console.log((window as unknown as TypeSymbolPolyfill).SymbolPolyfill('a').valueOf());
export {};
