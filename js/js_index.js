import myCall from './Js_api/call';
import myApply from './Js_api/apply';
import myBind from './Js_api/bind';
import myNew from './Js_api/new'
//call的测试
// let obj = {
//   age:18
// }
// let man = function(name,sex){
//   console.log(name);
//   console.log(sex);
//   console.log(this.age);
// }
// man.call(obj,'胖虎','女')
//apply的测试
// let obj = {
//   age:18
// }
// let man = function(name,sex){
//   console.log(name);
//   console.log(sex);
//   console.log(this.age);
// }
// man.myApply(obj,['胖虎','女'])
// let arr1= [1,2,3,5];
// let arr2 = [7,8,9];
// Array.prototype.push.myApply(arr1,arr2);
// console.log('arr',arr1,arr2);
// let num = [1,2,444,-22];
// let maxNum = Math.max.myApply(Math,num);
// let maxNum1 = Math.max.myCall(Math,...num);
// console.log('maxNum',maxNum,maxNum1)
//bind的测试
// let obj = {
//   age: 18
// };
// let man = function man(name, sex) {
//   this.eat = 'shit'
//   console.log(name);
//   console.log(sex);
//   console.log(this.age);
// };
// man.prototype.drink = 'niao';
// let people = man.myBind(obj,'panghu');
// let obj1 = new people('女');
// console.log('obj1',obj1)
//new的测试
// function Person(name,age){
//   this.name1 = name
//   // return {
//   //   name:'aaa',
//   //   age:age
//   // }
//   this.haha = function(){
//     console.log('qunima')
//   }
// }
// Person.prototype.eat = function(){
//   console.log('eat shit')
// };
// console.log('aaa',Person.prototype)
// let person = myNew.myNewFunction(Person,'panghu','18');
// // let person = new Person('panghu','18');
// person.eat()
// person.haha()
// console.log(person.__proto__,Person.prototype,person.name1,'person')