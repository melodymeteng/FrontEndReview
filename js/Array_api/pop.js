Array.prototype.ARRAY_POP = function() {
  let O = Object(this);
  //右移0位；保证len是数字且是整数
  let len = O.length >>> 0;
  if (len == 0) {
    return undefined;
  }
  len--;
  let delValue = O[len];
  delete O[len];
  O.length = len;
  return delValue;
};
