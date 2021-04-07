Function.prototype.myBind = function(context) {
  context = context || window;
  if(Object.prototype.toString.call(this) != '[object Function]'){
    throw new TypeError('use bind is not a function')
  }
  let self = this;
  let args = Array.prototype.slice.call(arguments, 1);
  var FuncBind = function() {
    let bindArgs = Array.prototype.slice.call(arguments);
    return self.apply(
      //如果FuncBind作为构造函数，那么this指向FuncBind，将调用bind指向FuncBind实例
      //如果只是普通函数，那么this指向window，将调用bind指向传入的this就可以
      this instanceof FuncBind ? this : context,
      //args是bind时，从第二个参数开始往后所有的参数，第一个参数是要指向的对象
      //bindArgs是bind后返回函数的arguments，将他两concat后得到的就是全部传入的参数（bind时以及bind后返回函数接收的参数）
      args.concat(bindArgs)
    );
  };
  //将返回的函数的prototype指向调用bind的prototype，这样可以使用调用bind的值，但是会同时影响两个函数的值，需要区分开，修改其中一个值另一个不会受影响
  let nullFun = function(){}
  nullFun.prototype = self.prototype;
  FuncBind.prototype = new nullFun();
  //用Object.create指向原型也可以
  // FuncBind.prototype = Object.create(self.prototype);
  return FuncBind;
};
