Function.prototype.myCall = function (context) {
    context = context || window;
    context.fn = this;
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
        args.push("arguments[" + i + "]");
    }
    var res = eval("context.fn(" + args + ")");
    delete context.fn;
    return res;
};

Function.prototype.myApply = function (context, arr) {
    context = context || window;
    context.fn = this;
    var res;
    if (!arr || arr.length === 0 || Object.prototype.toString.call(arr) !== "[object Array]") {
        res = context.fn();
    } else {
        var args = [];
        for (var i = 0; i < arr.length; i++) {
            args.push("arr[" + i + "]");
        }
        res = eval("context.fn(" + args + ")");
    }
    delete context.fn;
    return res;
};

Function.prototype.myBind = function (context) {
    if (Object.prototype.toString.call(this) !== "[object Function]") {
        throw Error("xxxx");
    }
    context = context || window;
    var self = this;
    var args = Array.prototype.slice.call(arguments,1);
    var Func = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof Func ? this : context, args.concat(bindArgs));
    };
    var NullFun = function () {};
    NullFun.prototype = self.prototype;
    Func.prototype = new NullFun();
    return Func;
};

function myNew() {
    var obj = Object.create();
    var Constructor = Array.prototype.shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    var res = Constructor.apply(obj, arguments);
    return Object.prototype.toString.call(res) === "[object Object]" ? res : obj;
}

function myInstanceof(left, right) {
    if (Object.prototype.toString.call(left) !== "[object Object]" || left === null) return false;
    if (Object.prototype.toString.call(right) !== "[object Function]") throw Error("xxx");
    var l = left.__proto__;
    var r = right.prototype;
    while (l || r) {
        if (l === r) return true;
        l = l.__proto__;
    }
    return false;
}
