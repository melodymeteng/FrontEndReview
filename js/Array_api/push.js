Array.prototype.ARRAY_PUSH = function(...item) {
  let O = Object(this);
  let count = item.length >>> 0;
  //右移0位；保证len是数字且是整数
  let len = O.length >>> 0;
  if (len + count > 2 ** 53 - 1) {
    throw new TypeError('超过最大数字');
  }
  for (let i = 0; i < count; i++) {
    O[len + 1] = item[i];
  }
  let newLength = len + count;
  O.length = newLength;
  return newLength;
};
