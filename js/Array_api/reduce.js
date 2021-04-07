Array.prototype.ARRAY_REDUCE = function(callbackFn, current) {
  //this指向的就是原数组
  //判断数组异常
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read protype 'reduce' of null or undefined");
  }
  //处理回调异常
  if (Object.prototype.toString.call(callbackFn) != '[object Function]') {
    throw new TypeError(callbackFn + 'is not a function');
  }
  //根据ecma262草案先把原数组转为对象
  let O = Object(this);
  //右移0位；保证len是数字且是整数
  let len = O.length >>> 0;
  let i = 0;
  if (current === undefined) {
    for (; i < len; i++) {
      if (i in O) {
        current = O[i];
        i++;
        break;
      }
    }
  }
  if (i === len && current === undefined)
    throw new Error('Each element of the array is empty');
  for (; i < len; i++) {
    //in 在原型链上查找更准确
    if (i in O) {
      let iValue = O[i];
      // 回调参数->上一次回调调用函数的返回值，或者是提供的初始值、当前值、当前索引、原始调用数组
      current = callbackFn(current, iValue, i, O);
    }
  }
  return current;
};
