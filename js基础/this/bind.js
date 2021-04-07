/**
 * 
 * @param {要绑定的目标对象} context 
 * 1、context要指向的对象，如果是null 或者 undefined那么就指向window
 * 2、调用者必须是函数
 * 3、args取bind()中传入的参数，从第二个开始往下，第一个是context
 * 4、要返回一个函数，并且这个函数时可以被new实例化使用的
 * 5、创建一个函数FunBind，bindFunArgs是返回函数的arguments数组，这个也是调用bind后返回函数的参数集合。
 * 6、args.concat(bindFunArgs) concat起来后就是bind时传入的参数加上调用后返回函数传入的参数。
 * 7、如果返回函数被new实例化使用，那么new的时候，返回函数的this肯定要指向返回函数的内部，所以this instanceof FunBind来判断返回函数的this是否指向本身，
 *    如果this instanceof FunBind是false，那么需要将调用者（self指向的就是调用者）的this改变为context（需要指向的对象）。
 * 8、将调用者的原型指向返回函数的原型，二者关联起来，原型指向后，返回函数可以拿到调用者的属性和方法。如果直接FunBind.prototype = self.prototype;会导
 *    致修改返回函数的原型也会影响到调用者的原型，所以可以使用一个空函数，先把空函数的原型指向调用者的原型，然后再将空函数的实例化赋值给返回函数，这样就不
 */
Function.prototype.myBind = function (context) {
    context = context || window;
    var self = this;
    if (Object.prototype.toString.call(self) !== "[object Function]") {
        return new Error("请使用函数来调用bind");
    }
    var args = Array.prototype.slice.call(arguments, 1);
    var FunBind = function () {
        var bindFunArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof FunBind ? this : context, args.concat(bindFunArgs));
    };
    // FunBind.prototype = Object.create(self.prototype);
    var NullFun = function () {};
    NullFun.prototype = self.prototype;
    FunBind.prototype = new NullFun();
    return FunBind;
};
