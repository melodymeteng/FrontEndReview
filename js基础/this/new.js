/**
 * new 的四个步骤
 * 1、创建一个新的对象
 * 2、将新对象与构造函数原型链接起来，也就是将实例通过__proto__链接到构造函数原型Constructor.prototype
 * 3、将对象的this指向构造函数
 * 4、若构造函数有返回对象，那么就将这个对象返回，如果构造函数没有返回值或返回值不是对象，那么将新创建的对象返回。
 */
const myNew = function () {
    const obj = new Object();
    const Construcotor = Array.prototype.shift.call(arguments);
    obj.__proto___ = Construcotor.prototype;
    var res = Construcotor.apply(obj, arguments);
    return res instanceof Object ? res : obj;
};
