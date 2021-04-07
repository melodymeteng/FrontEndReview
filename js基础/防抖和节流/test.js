function debounce(fn, wait, nowFlag) {
    let timer;
    return function () {
        if (timer) {
            timer = null;
            clearTimeout(timer);
        }
        if (nowFlag === true) {
            let callnow = !timer;
            timer = setTimeout(() => {
                timer = null;
            }, wait);
            if (callnow === true) fn.apply(this, arguments);
        } else {
            timer = setTimeout(() => {
                fn.apply(this, arguments);
            }, wait);
        }
    };
}

function throttle1(fn, wait) {
    let preTime = 0;
    return function () {
        let now = +new Date();
        if (wait < now - preTime) {
            preTime = now;
            fn.apply(this);
        }
    };
}

function throttle2(fn, wait) {
    let timer;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn.apply(this, arguments);
            }, wait);
        }
    };
}

function throttle3(fn, wait) {
    let timer,
        preTime = 0;
    return function () {
        let now = +new Date();
        let mainTime = wait - (now - preTime);
        if (mainTime <= 0) {
            preTime = now;
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(this, arguments);
        } else if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                preTime = +new Date();
                fn.apply(this, arguments);
            }, mainTime);
        }
    };
}

function throttle4(fn, wait, option) {
    let timer,
        preTime = 0;
    return function () {
        let now = +new Date();
        if (!preTime && option.first === false) preTime = now;
        let mainTime = wait - (now - preTime);
        if (mainTime <= 0) {
            preTime = now;
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            fn.apply(this, arguments);
        } else if (!timer && option.last === true) {
            timer = setTimeout(() => {
                timer = null;
                preTime = option.first === false ? 0 : +new Date();
                fn.apply(this, arguments);
            }, mainTime);
        }
    };
}
