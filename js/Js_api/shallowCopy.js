//浅拷贝手写
function shallowCopy(target) {
  if (typeof target === 'object' && typeof target !== null) {
    let cloneTarget = Array.isArray(target) ? [] : {};
    for (props in target) {
      if (target.hasOwnPrototype(props)) {
        cloneTarget[props] = target[props];
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
//利用object.assign
let obj = { name: 'mike', age: 18 };
let obj2 = Object.assign({}, obj, { name: 'sss' });
console.log(obj2);
//利用concat拷贝数组
let arr = [1, 2, 3];
let newArr = arr.concat();
newArr[1] = 11;
//arr不改变的，完成浅拷贝
//slice浅拷贝
let arr = [1, 2, 3];
let newArr = arr.slice();
//...
let arr = [1, 2, 3];
let newArr = [...arr];
