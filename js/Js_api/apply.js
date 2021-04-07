Function.prototype.myApply = function (context, arr) {
    //传入对象如果为null则指向window
    context = context || window;
    //把函数放到要绑定的对象的属性下，完成call后delete即可
    context.fn = this;
    let result;
    //判断如果没传入数组或者传入的不是数组，那么直接执行函数并删除后返回
    if (!arr || Object.prototype.toString.call(arr) != "[object Array]") {
        result = context.fn();
        //如果正确传入数组那么就将数组元素循环去除
    } else {
        let args = [];
        for (let i = 0; i < arr.length; i++) {
            args.push("arr[" + i + "]");
        }
        //eval()内的数组会自动调用Array.toString()方法[1,2,3]-->'1,2,3'
        result = eval("context.fn(" + args + ")");
    }
    delete context.fn;
    return result;
};
