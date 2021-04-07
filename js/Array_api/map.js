Array.prototype.ARRAY_MAP = function(callbackFn, thisArg) {
  //this指向的就是原数组
  //判断数组异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read protype 'map' of null or undefined");
  }
  //处理回调异常
  if (Object.prototype.toString.call(callbackFn) != '[object Function]') {
    throw new TypeError(callbackFn + 'is not a function');
  }
  //根据ecma262草案先把原数组转为对象
  let O = Object(this);
  let T = thisArg || this;
  //右移0位；保证len是数字且是整数
  let len = O.length >>> 0;
  let newA = new Array(len);
  for (let i = 0; i < len; i++) {
    //in 在原型链上查找更准确
    if (i in O) {
      let iValue = O[i];
      //依次给回调函数传入this、当前值、索引、原数组
      let newMapValue = callbackFn(T, iValue, i, O);
      newA[i] = newMapValue;
    }
  }
  return newA;
};
