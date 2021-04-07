//组合继承
function Parent(name) {
  this.name = name;
  this.money = [1, 2, 3];
}
Parent.prototype.sayName = function () {
  console.log('say', this.name);
};
function Child(name, age) {
  //将父的this指向子内
  this.age = age;
  Parent.call(this, name);
}
//将子的原型指向父的示例
Child.prototype = new Parent();
//将子的构造函数指回子（子内部已经可以指向父了，子已经继承了父的方法，每次new子的时候方法都只会创建一次）
Child.prototype.constructor = Child;
var child1 = new Child('panghu', 18);
Parent.prototype.money = [1, 2, 2, 4];
var parent = new Parent();
console.log('child1', child1.__proto__.money, parent.__proto__);
// function P(name) {
//   this.name = name;
//   this.money = [1, 2, 3];
// }
// P.prototype.say = function () {
//   console.log(this.name);
// };
// function C(name, age) {
//   this.age = age;
//   P.call(this, name);
// }
// C.prototype = new P();
// C.prototype.constructor = C;
