/**
 * 
 * @param {要指向的对象} context 
 * 1、传入的context为null或undefined时，将其指向window
 * 2、this指向的是调用call的函数，context.fn = this;是将调用call的函数赋值给要指向对象的fn属性
 * 3、因为call接收一个context属性，后续传入的值不像apply是以数组传入，而是一个一个传，所以在for时，需要取arguments（类数组）；
 * 4、args = ['arguments[1]','arguments[2]',...]
 * 5、eval("context.fn(" + args + ")")会调用Array.toString(),等同于执行context.fn(arguments[1],arguments[2],arguments[3]...)
 */
Function.prototype.myCall = function (context) {
    context = context || window;
    context.fn = this;
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push("arguments[" + i + "]");
    }
    var res = eval("context.fn(" + args + ")");
    delete context.fn;
    return res;
};
