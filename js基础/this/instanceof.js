/**
 * 
 * @param {*} left instanceof 左边的变量（实例）
 * @param {*} right instanceof 右边边的变量（构造函数）
 * 左边通常是示例，实例的.__proto__指向构造函数的原型
 * 右边通常是构造函数，构造函数的.prototype指向构造函数的原型
 * 判断left.__proto__ === right.prototype，实例的.__proto__是否指向构造函数原型，如果不是,
 * 那么left.__proto__.__proto__指向的就是构造函数原型的原型，可以这样沿着原型链查找，如果一直没有找到，那么就返回false
 * @returns 
 */
const myInstanceof = function(left,right){
    if(typeof left !== 'object'||left === null) return false
    if(typeof right !== 'function') return new Error('...')
    let lProto = left.__proto__;
    let rProto = right.prototype;
    while(lProto){
        if(lProto === rProto) return true
        lProto = lProto.__proto__
    }
    return false
}