Function.prototype.myCall = function (context) {
    //传入对象如果为null则指向window
    context = context || window;
    //把函数放到要绑定的对象的属性下，完成call后delete即可
    context.fn = this;
    var args = [];
    //for循环成立条件是除了要绑定指向的对象作为参数传递进来之外，还有别的参数传递进来，
    //那么此时arguments这个类数组长度大于1，类数组是可以for循环的，从第二个参数开始依次放入一个新的数组中，
    //然后在执行已经放到要绑定指向的对象属性下的函数fn时，解构入参传入函数，执行完fn后删除对象下的fn
    for (var i = 1; i < arguments.length; i++) {
        args.push("arguments[" + i + "]");
    }
    var result = eval("context.fn(" + args + ")");
    delete context.fn;
    //return是为了考虑到调用call的函数本身就有return的情况
    return result;
};
