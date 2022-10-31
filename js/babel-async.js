"use strict";

function _asyncToGenerator(fn) {
  return function() {
    var gen = fn.apply(this, arguments);
    return new Promise(function(resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(
            function(value) {
              step("next", value);
            },
            function(err) {
              step("throw", err);
            }
          );
        }
      }
      return step("next");
    });
  };
}

var fetchData = function fetchData(data) {
  return new Promise(function(resolve) {
    return setTimeout(resolve, 1000, data + 1);
  });
};

var fetchValue = (function() {
  var _ref = _asyncToGenerator(
    /*#__PURE__*/ regeneratorRuntime.mark(function _callee() {
      var value1, value2, value3;
      return regeneratorRuntime.wrap(
        function _callee$(_context) {
          while (1) {
            switch ((_context.prev = _context.next)) {
              case 0:
                _context.next = 2;
                return fetchData(1);

              case 2:
                value1 = _context.sent;
                _context.next = 5;
                return fetchData(value1);

              case 5:
                value2 = _context.sent;
                _context.next = 8;
                return fetchData(value2);

              case 8:
                value3 = _context.sent;

                console.log(value3);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        },
        _callee,
        this
      );
    })
  );

  return function fetchValue() {
    return _ref.apply(this, arguments);
  };
})();

fetchValue();
