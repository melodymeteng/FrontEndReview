//深拷贝
//JSON.stringify(JSON.parse());
//会有很多缺点，1、循环引用2、无法拷贝特殊对象3.不可拷贝函数
function isObject(target) {
  return (
    (typeof target === 'object' || typeof target === 'function') &&
    target !== null
  );
}
function getType(obj) {
  return Object.toString.call(obj);
}
const canCopy = {
  '[object Map]': true,
  '[object Set]': true,
  '[object Array]': true,
  '[object Object]': true,
};
const mapType = '[object Map]';
const setType = '[object Set]';
const arrayType = '[object Array]';
const objectType = '[object Object]';
function deepCopy(target) {
  /*
    WeakMap具有弱引用的特点，可以解决循环引用，并且有利于垃圾回收，如果使用Map会造成强引用
  */
  let weakMap = new WeakMap();
  if (weakMap.get(target)) {
    return target;
  }
  let cloneTarget;
  let type = getType(target);
  if (!canCopy[type]) {
    return;
  } else {
    let ct = target.prototype;
    cloneTarget = new ct();
  }
  if (isObject(target)) {
    //设置锁，如果拷贝过了直接返回
    weakMap.set(target, true);
    /*
      Map类型,通过Map类型的set方法递归的将要拷贝的对象key、value储存到Map中
      Set类型，通过Set类型的add方法递归的将要拷贝的对象的value存储到Set中
      普通对象类型，in在原型链上查找属性，递归的将要拷贝的对象key、value放到新的克隆对象中
     */
    if (type === mapType) {
      target.forEach((item, index) => {
        cloneTarget.set(deepCopy[index], deepCopy[item]);
      });
    }
    if (type === setType) {
      target.forEach((item, index) => {
        cloneTarget.add(deepCopy(item));
      });
    }
    for (props in target) {
      if (target.hasOwnPrototype(props)) {
        cloneTarget[props] = deepCopy(target[props]);
      }
    }
    return cloneTarget;
  } else {
    return target;
  }
}
