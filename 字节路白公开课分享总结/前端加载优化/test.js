function timeLog(target, name, descriptor) {
    const val = descriptor.value;
    descriptor.value = async function () {
        console.time(name);
        const res = await val.apply(this, arguments);
        console.timeEnd(name);
        return res;
    };
    return descriptor;
}

function checkWebp() {
    try {
        return document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0;
    } catch {
        return false;
    }
}

const supportWebp = checkWebp();

function transferWebp(url) {
    if (!url) return;
    if (url.indexOf("data:") === 0 || supportWebp === false) return url;
    return url + ".webp";
}

function loadLimit(arr, handler, limit) {
    let cArr = [].concat(arr);
    let promiseArr = [];
    promiseArr = cArr.splice(0, limit).map((item, index) => {
        return handler(item).then(() => {
            return index;
        });
    });
    let p = Promise.race(promiseArr);
    for (let i = 0; i < cArr.length; i++) {
        p = p.then((value) => {
            promiseArr[value] = handler(cArr[i]).then(() => {
                return value;
            });
            return Promise.race(promiseArr);
        });
    }
}
