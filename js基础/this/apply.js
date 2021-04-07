/**
 *
 * @param {要指向的对象} context
 * @param {数组} arr
 * 1、如果context传入了null或undefined那么就将它指向window
 * 2、this指向的是调用call的函数，context.fn = this，将调用apply的函数赋值给要指向的对象的fn属性，最后删除即可
 * 3、第二个参数如果传入了空数组或者没有传或者传入的不是数组，那么直接执行调用call的函数
 * 4、for循环传入的数组，把arr[1],arr[2]...传入args,因为call是es3的语法，那么最好不要使用es6的...
 * 5、args = ['arr[1]','arr[2]',...]
 * 6、eval("context.fn(" + args + ")")会调用Array.toString(),等同于执行context.fn(arr[1],arr[2],arr[3]...)
 */
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
