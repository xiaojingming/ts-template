class Person {
    constructor(name) {
        this.name = name;
    }
}

"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function Person(name) {
    _classCallCheck(this, Person);

    this.name = name;
};

console.log('%c---------------->', 'color: red;');

class Person {
    // 实例属性
    foo = 'foo';
    // 静态属性
    static bar = 'bar';

    constructor(name) {
        this.name = name;
    }
}

'use strict';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function Person(name) {
    _classCallCheck(this, Person);

    this.foo = 'foo';

    this.name = name;
};

Person.bar = 'bar';

console.log('%c---------------->', 'color: red;');

class Person {
    constructor(name) {
        this.name = name;
    }

    sayHello() {
        return 'hello, I am ' + this.name;
    }

    static onlySayHello() {
        return 'hello'
    }

    get name() {
        return 'kevin';
    }

    set name(newName) {
        console.log('new name 为：' + newName)
    }
}

function Person(name) {
    this.name = name;
}

Person.prototype =  {
    sayHello: function () {
        return 'hello, I am ' + this.name;
    },
    get name() {
        return 'kevin';
    },
    set name(newName) {
        console.log('new name 为：' + newName)
    }
}

Person.onlySayHello = function () {
    return 'hello'
};

'use strict';

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function() {
    function Person(name) {
        _classCallCheck(this, Person);

        this.name = name;
    }

    _createClass(Person, [{
        key: 'sayHello',
        value: function sayHello() {
            return 'hello, I am ' + this.name;
        }
    }, {
        key: 'name',
        get: function get() {
            return 'kevin';
        },
        set: function set(newName) {
            console.log('new name 为：' + newName);
        }
    }], [{
        key: 'onlySayHello',
        value: function onlySayHello() {
            return 'hello';
        }
    }]);

    return Person;
}();