const PromiseRace = function (arr) {
    return new Promise((resolve, reject) => {
        if (arr.length === 0 || !arr || Object.prototype.toString.call(arr) !== "[object Array]") {
            return;
        } else {
            for (let i, len = arr.length; i < len; i++) {
                Promise.resolve(arr[i])
                    .then((value) => {
                        resolve(value);
                    })
                    .catch((e) => reject(e));
            }
        }
    });
};
