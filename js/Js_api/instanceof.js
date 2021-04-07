/*
  @param left代表instanceof左边的表达式
  @param right代表instanceof右边的表达式
  利用原型链向上查找，构造函数的prototype指向原型，实例的__proto__也指向原型
  判断他两是否全等即可，如果不等就继续通过实例的__proto__.__proto__继续向上查找
*/

function myInstanceof(left, right) {
  if (typeof right !== 'function') throw new Error('cuowu');
  if (typeof left !== 'object' || left === null) return false;
  let rProto = right.prototype;
  let lProto = left.__proto__;
  while (lProto) {
    if (lProto === rProto) return true;
    lProto = lProto.__proto__;
  }
  return false;
}
