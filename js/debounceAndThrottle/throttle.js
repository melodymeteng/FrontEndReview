var conut = 1;
var container = document.getElementById('container');
function conutAdd(e) {
  container.innerHTML = conut++;
  console.log(e);
}
container.onmousemove = throttle3(conutAdd, 1000);
//时间戳比较法节流，保留事件第一次触发时的时间戳prevTime
//再次触发时，如果当前时间-上次触发时间已经大于节流的间隔时间那么就触发函数
function throttle1(func, wait) {
  let prevTime = 0;
  let context, args;
  return function () {
    var now = +new Date();
    context = this;
    args = arguments;
    if (now - prevTime > wait) {
      func.apply(context, args);
      prevTime = now;
    }
  };
}
//定时器法节流，在一定时间内（wait）只能添加一个定时器并触发其中的函数
function throttle2(func, wait) {
  let timer;
  let context, args;
  return function () {
    context = this;
    args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        func.apply(context, args);
      }, wait);
    }
  };
}
//1.时间戳法是立即执行的，定时器法是延迟wait后执行
//2.时间戳法是立即停止触发函数的，而定时器法停止事件后会执行最后一次触发函数

//立即执行+停止事件后执行最后一次触发函数
function throttle3(func, wait) {
  var timer, context, args;
  var prevTime = 0;
  var later = function () {
    prevTime = +new Date();
    timer = null;
    func.apply(context, args);
  };
  return function () {
    context = this;
    args = arguments;
    var now = +new Date();
    var remainingTime = wait - (now - prevTime);
    //还需等待时间，如果<=0或者系统时间被修改，那么if成立，此时按照类似时间戳的方法节流
    if (remainingTime <= 0 || remainingTime > wait) {
      //下面的else if判断!timer是为了在一直触发事件时，等待时间中不会触发这个定时器（还没走完等待时间就被清除了），只有在停止时才会
      //因为这里如果到了下一个时间周期，如果有上次等待时间中生成的定时器，那么就直接给它清除并设值为null，这样保证只会有一种节流来触发函数
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      prevTime = now;
      func.apply(context, args);
      //如果不成立也就是停止事件后还没到下次的触发时间（比如说还有2.5s,wait = 3s）
      //那么如果此时没有定时器，生成一个还有2.5s等待时间的定时器执行最后一次触发函数
    } else if (!timer) {
      timer = setTimeout(later, remainingTime);
    }
  };
}
//新增一个参数，可以灵活设置无头有尾或有头无尾
//leading：false 表示禁用第一次执行
//trailing: false 表示禁用停止触发的回调
function throttle4(func, wait, option = {}) {
  var timer, context, args;
  var prevTime = 0;
  var later = function () {
    //如果leading为false，那么定时器执行时把prevTime置为0这样下面的!prevTime条件就成立了
    prevTime = option.leading === false ? 0 : +new Date();
    timer = null;
    func.apply(context, args);
  };
  return function () {
    context = this;
    args = arguments;
    var now = +new Date();
    //leading为false并且trailing为true此时代表无头有尾，remaining一直等于wait，一直使用定时器法节流，反之一直使用时间戳法节流
    if (!prevTime && option.leading === false) prevTime = now;
    var remainingTime = wait - (now - prevTime);
    //还需等待时间，如果<=0或者系统时间被修改，那么if成立，此时按照类似时间戳的方法节流
    if (remainingTime <= 0 || remainingTime > wait) {
      //下面的else if判断!timer是为了在一直触发事件时，等待时间中不会触发这个定时器（还没走完等待时间就被清除了），只有在停止时才会
      //因为这里如果到了下一个时间周期，如果有上次等待时间中生成的定时器，那么就直接给它清除并设值为null，这样保证只会有一种节流来触发函数
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      prevTime = now;
      func.apply(context, args);
      //如果不成立也就是停止事件后还没到下次的触发时间（比如说还有2.5s,wait = 3s）
      //那么如果此时没有定时器，生成一个还有2.5s等待时间的定时器执行最后一次触发函数
      //如果trailing为true只会执行定时器节流法，自然会执行最后一次，如果为false并且leading是true那么一直都不会执行定时器法
    } else if (!timer && option.trailing !== false) {
      timer = setTimeout(later, remainingTime);
    }
  };
}
throttle4.cancel = function () {
  clearTimeout(timer);
  prevTime = 0;
  timer = null;
};
function test(func, wait, option = {}) {
  var timer, context, args;
  var prevTime = 0;
  var later = function () {
    prevTime = option.first === false ? 0 : +new Date();
    timer = null;
    func.apply(context, args);
  };
  return function () {
    context = this;
    args = arguments;
    var now = +new Date();
    if (!prevTime && option.first === false) prevTime = now;
    var shengyuTime = wait - (now - prevTime);
    if (shengyuTime <= 0 || shengyuTime > wait) {
      if (timer) {
        clearTimeout(timer);
        timer = mnull;
      }
      prevTime = now;
      func.apply(context, args);
    } else if (!timer && option.callFn !== false) {
      timer = setTimeout(later, shengyuTime);
    }
  };
}
function test1(wait, func, liji) {
  var timer;
  return function () {
    var context = this;
    var args = arguments;
    if (timer) clearTimeout(timer);
    if (liji) {
      var callNow = !timer;
      timer = setTimeout(function () {
        timer = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}
