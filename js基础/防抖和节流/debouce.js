//防抖

const debouce = function (fn, wait, nowFlag) {
    let timer;
    return function () {
        let context = this;
        let args = arguments;
        if (timer) clearTimeout(timer);
        if (nowFlag) {
            //nowFlag === true;立即执行事件函数。timer现在是undefined，那么callNow === true,然后创建一个等待时间wait的setTimeout，在一定时间后timer = null，这样if (timer) clearTimeout(timer);不会执行。callNow == true；也可以继续执行fn。如果wait时间还没到又执行了事件。那么if (timer) clearTimeout(timer)成立，清空上一次创建的setTimeout也不会被执行回调执行timer = null;那么callNow也就等于false，if (callNow) fn.apply(context, args)就不会被执行。必须要等待这次创建的setTimeout到了wait时间后还没有再次触发事件（也就是没有被清除定时器），此时timer = null了，就又会执行fn了
            let callNow = !timer;
            timer = setTimeout(function () {
                timer = null;
            }, wait);
            if (callNow) fn.apply(context, args);
        } else {
            //nowFlag === false;不立即执行事件函数;再给timer赋值后，如果wait的时间还没到又执行了事件，那么if (timer) clearTimeout(timer)就成立了，那么会清空上一次创建的setTimeout也不会被执行回调执行fn。在wait时间走完后就会执行fn。
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, wait);
        }
    };
};
