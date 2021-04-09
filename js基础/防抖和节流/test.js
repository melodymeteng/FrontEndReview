function debounce(fn, wait, nowFlag) {
    let timer;
    return function () {
        if (timer) clearTimeout(timer);
        if (nowFlag === true) {
            let callnow = !timer;
            timer = setTimeout(() => (timer = null), wait);
            if (callnow === true) fn.apply(this, arguments);
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments);
            }, wait);
        }
    };
}

function throttle1(fn, wait) {
    let preTime;
    return function () {
        let now = +new Date();
        if (wait <= now - preTime) {
            preTime = now;
            fn.apply(this, arguments);
        }
    };
}

function throttle2(fn, wait) {
    let timer;
    return function () {
        const context = this;
        const args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                timer = null;
                fn.apply(context, args);
            }, wait);
        }
    };
}

function throttle3(fn, wait) {
    let timer,
        preTime = 0;
    return function () {
        let now = +new Date();
        const context = this;
        const args = arguments;
        let mainTime = wait - (now - preTime);
        if (mainTime <= 0) {
            preTime = now;
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(context, args);
        } else if (!timer) {
            timer = setTimeout(function () {
                preTime = +new Date();
                timer = null;
                fn.apply(context, args);
            }, mainTime);
        }
    };
}

function throttle4(fn, wait, option) {
    let timer,
        preTime = 0;
    return function () {
        let now = +new Date();
        const context = this;
        const args = arguments;
        if (option.first === false && preTime === 0) preTime = now;
        let mainTime = wait - (now - preTime);
        if (mainTime <= 0) {
            preTime = now;
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(context, args);
        } else if (!timer && option.last === true) {
            timer = setTimeout(function () {
                preTime = option.first === false ? 0 : +new Date();
                timer = null;
                fn.apply(context, args);
            }, mainTime);
        }
    };
}
