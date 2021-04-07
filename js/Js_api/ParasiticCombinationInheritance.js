//寄生组合继承
//组合继承的缺点是在子类继承时在第一步 Child.prototype = new Parent()第一次调用父类的构造函数，第二步var child1 = new Child();
//不要忘了，在Child构造函数中会执行Parent.call(this),这个时候第二次调用父类的构造函数，整个继承下来会调用两次父的构造函数，
//那么寄生组合继承就是优化这一点的(将Child.prototype = new Parent()这一步用寄生的方式实现，减少一次调用父的构造函数)
function createObj(obj) {
  function F() {}
  //obj = Parent.prototype,将F的原型指向父的原型，返回F的示例此时new F() == new Parent() F已继承了父的方法；
  F.prototype = obj;
  return new F();
}
function jicheng(child, parent) {
  // 寄生实例已经得到了父的属性
  var jishengshili = createObj(parent.prototype);
  console.log(jishengshili.sayName);
  //子的原型指向F的实例(继承了父的方法) == 指向Parent的实例可以继承父的方法
  child.prototype = jishengshili;
  //Parent.prototype.constructor = Child;将父的constructor指向子构造函数，继承父constructor内的属性
  jishengshili.constructor = child;
  //此时log子实例的money发现已经继承了父的属性
  console.log('132',new child().money)
}
function Parent(name) {
  this.name = name;
  this.money = [1, 2, 3];
}
Parent.prototype.sayName = function() {
  console.log('say', this.name);
};
function Child(name, age) {
  //将父的this指向子内
  Parent.call(this, name);
  this.age = age;
}
jicheng(Child, Parent);
var child1 = new Child('panghu', 18);
console.log('child1', child1);

function creat(obj){
  function F(){};
  F.prototype = obj;
  return new F();
}
function jicheng(c,p){
  var jishengNew = createObj(p.prototype);
  c.prototype = jishengNew;
  jishengNew.constructor = c;
}