"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.object.keys.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.array.reverse.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
var _class;
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;
  if ('value' in desc || desc.initializer) { desc.writable = true; }
  desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc);
  if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; }
  if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; }
  return desc;
}
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
var MyClass = (_class = /*#__PURE__*/function () {
  function MyClass() {
    _classCallCheck(this, MyClass);
  }
  _createClass(MyClass, [{
    key: "method",
    value: function method() {}
  }]);
  return MyClass;
}(), (_applyDecoratedDescriptor(_class.prototype, "method", [enumerable, readonly], Object.getOwnPropertyDescriptor(_class.prototype, "method"), _class.prototype)), _class);
function readonly(target, name, descriptor) {
  descriptor.writable = false;
  return descriptor;
}
function unenumerable(target, name, descriptor) {
  descriptor.enumerable = false;
  return descriptor;
}
