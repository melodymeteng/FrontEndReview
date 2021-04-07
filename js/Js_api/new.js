function myNewFunction() {
  var obj = new Object();
  //第一个参数是构造函数、第二个开始是要传入的参数，shift用来取出第一个参数，剩下的argument就是要传入的参数（shift会改变原数组）
  var Constructor = [].shift.call(arguments); //定义传入的构造函数
  //将要返回的obj的隐示原型指针__proto__（obj.prototype）指向构造函数的原型，获得构造函数原型上的属性
  obj.__proto__ = Constructor.prototype;
  //用apply将obj的this指向传入的构造函数。获取到构造函数的属性,同时如果构造函数有返回值那么赋值给result,如果返回值是别的就返回一开始定义的对象
  var result = Constructor.apply(obj, arguments);
  return result instanceof Object ? result : obj;
}
export default{myNewFunction}