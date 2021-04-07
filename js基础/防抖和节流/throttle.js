//节流

//1.时间戳法节流

const throttle1 = function (fn, time) {
    let preTime = 0;
    return function () {
        let now = +new Date();
        // 取当前时间减去上次触发时的时间戳，若大于规定时间间隔，则触发函数。apply为了确保js的指向，arguments确保匿名函数的参数
        if (now - preTime > time) {
            fn.apply(this, arguments);
            preTime = now;
        }
    };
};

//2.定时器节流法
const throttle2 = function (fn, time) {
    let timer;
    return function () {
        let context = this;
        let args = arguments;
        //判断timer是否有效（setTimeout会返回数值），当还没有执行setTimeout内的回调函数时，timer一直有数值。
        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args);
                timer = null;
            }, time);
        }
    };
};

//时间戳节流法，传入的函数是会立即执行的，停止事件后是会立即停止触发。
//定时器节流法，传入的函数是会在延迟时间间隔后再执行，停止事件后还会把最后一个事件执行完毕

//3.立即执行+停止事件后最后一个事件继续执行完毕
const throttle3 = function (fn, time) {
    let timer;
    let preTime = 0;
    return function () {
        let context = this;
        let args = arguments;
        let now = +new Date();
        // 第一次触发时，preTime为0，那么time减去当前时间戳肯定为负数，所以if中remainTime判断小于等于0，第二次触发时，由于上一次已经将preTime赋值了上次执行时的时间戳，那么第二次执行时的时间戳减去上次执行的时间戳，如果刚好等于时间间隔time或者已经大于了time，那么就代表已经达到了节流的时间间隔要求，如果第二次的now-preTime是小于时间间隔time的要求的并且停止触发事件了（因为再次触发事件会导致now被重新赋值变大），那么就执行一次remainTime时间的setTimeout。比如now-preTime后等于1s,time要求间隔3s,那么remainTime就是2s，这样子就会生成一个2s后触发的setTimeout从而执行最后一次事件。
        let remainTime = time - (now - preTime);
        if (remainTime <= 0) {
            preTime = now;
            //至于这里判断timer是否有被赋值，是因为在remainTime不符合<=0或者>time时，会创造一个remainTime的setTimeout，但是在setTimeout内回调还未执行时，再次触发了函数，那么需要将上一次触发创建的setTimeout清除。
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(context, args);
            //!timer防止已经有定时器在等待执行回调了，会再次创建setTimeout
        } else if (!timer) {
            timer = setTimeout(function () {
                preTime = +new Date();
                timer = null;
                fn.apply(context, args);
            }, remainTime);
        }
    };
};

//4.传入一个新的option{}
//option.frist:true 代表第一次事件立即触发。false代表延迟触发第一次事件
//option.last:true 代表停止节流时再执行最后一次回调。false代表不执行
//first:true && last:true 有头有尾
//first:false && last:true 无头有尾
//first:false && last:false 无头无尾
//first:true && last:false 有头无尾
const throttle4 = function (fn, time, option = {}) {
    let timer;
    let preTime = 0;
    return function () {
        let context = this;
        let args = arguments;
        let now = +new Date();
        // first === false将preTime = now 会导致remainTime === time那么就会走到else if中，如果此时last === false那么setTimeout也不会有，那么在下次触发时!preTime不成立（因为上次触发已经将now赋值给了preTime），此时恢复正常时间戳节流。如果此时last === true那么将会设定一个remainTime后触发（因为remainTime === time也就是时间间隔达到要求后在执行）的setTimeout
        //first === true&&last === false的情况就是立即执行并且最后一次事件函数不执行
        //first === false&&last === false的情况就是不立即执行并且最后一次事件函数不执行
        //first === false&&last === true的情况就是不立即执行并且停止触发时执行最后一次事件函数。
        //first === true&&last === true的情况就是立即执行并且停止触发时执行最后一次事件函数。
        if (!preTime && option.first === false) preTime = now;
        let remainTime = time - (now - preTime);
        if (remainTime <= 0) {
            preTime = now;
            //至于这里判断timer是否有被赋值，是因为在remainTime不符合<=0或者>time并且last === true时，会创造一个remainTime的setTimeout，但是在setTimeout内回调还未执行时，再次触发了函数，那么需要将上一次触发创建的setTimeout清除。
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(context, args);
            //!timer防止已经有定时器在等待执行回调了，会再次创建setTimeout
        } else if (!timer && option.last !== false) {
            timer = setTimeout(function () {
                //如果使用定时器节流，并且不要求立即执行，那么就将preTime赋值0，这样if (!preTime && option.first === false)会一直成立，也就等于是会一直用定时器节流。
                preTime = option.first === false ? 0 : +new Date();
                timer = null;
                fn.apply(context, args);
            }, remainTime);
        }
    };
};
