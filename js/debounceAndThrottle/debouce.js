var conut = 1;
var container = document.getElementById('container');
function conutAdd(e) {
  container.innerHTML = conut++;
  console.log(e);
}
container.onclick = debounce(conutAdd, 1000, true);

function debounce(func, wait, immediate) {
  var timer;
  var debounce = function() {
    var context = this;
    var args = arguments;
    //如果已经生成定时器了，那么开始清除上一个的定时器,timer就是定时器生成后返回的定时器id
    if (timer) clearTimeout(timer);
    if (immediate) {
      //如果要立即执行immediate == true，!timer == !undefined,callNow == true
      var callNow = !timer;
      //这一步是可以分为两步来理解
      //1.创建等待wait时间的定时器，这样可以防抖，保证多少秒后才会执行下面的if (callNow) func.apply(context, args);因为给timer赋值定时器后，!timer == false
      //2.如果不给timer初始为null，那么下面的if (callNow) func.apply(context, args)永远不会执行，因为一直！timer == false
      timer = setTimeout(function() {
        timer = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(function() {
        //给传入的函数绑定对应的this指向和参数（主要是事件源）
        func.apply(context, args);
      }, wait);
    }
  };
  //取消防抖调用
  debounce.cancel = function() {
    clearTimeout(timer);
    timer = null;
  };
  return debounce
}
