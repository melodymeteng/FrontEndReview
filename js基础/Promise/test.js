function PromiseAll(arr) {
    return new Promise((resolve, reject) => {
        if (Object.prototype.toString.call(arr) !== "[object Array]") return reject(new Error("xxx"));
        const res = [];
        let index = 0;
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            Promise.resolve(arr[i])
                .then((value) => {
                    res[i] = value;
                    index++;
                    if (index === len) resolve(res);
                })
                .catch((e) => reject(e));
        }
    });
}

function PromiseRace(arr) {
    return new Promise((resolve, reject) => {
        if (Object.prototype.toString.call(arr) !== "[object Array]") return reject(new Error("xxx"));
        const len = arr.length;
        for (let i = 0; i < len; i++) {
            Promise.resolve(arr[i])
                .then((value) => {
                    resolve(value);
                })
                .catch((e) => reject(e));
        }
    });
}

const cacheMap = new Map();
function enableCache(target, name, descriptor) {
    const val = descriptor.value;
    descriptor.value = function (...args) {
        const cacheKey = name + JSON.stringify(args);
        if (!cacheMap.has(cacheKey)) {
            const value = Promise.resolve(val.apply(this, args)).catch((e) => {
                cacheMap.set(cacheKey, null);
            });
            cacheMap.set(cacheKey, value);
        }
        return cacheMap.get(cacheKey);
    };
    return descriptor;
}

class PromiseLimit {
    constructor(max) {
        this.max = max;
        this.count = 0;
        this.taskQueue = [];
    }
    call(caller, ...args) {
        return new Promise((resolve, reject) => {
            const task = this.createTask(caller, args, resolve, reject);
            if (this.count > this.max) {
                this.taskQueue.push(task);
            } else {
                task();
            }
        });
    }
    createTask(caller, args, resolve, reject) {
        return function () {
            caller(...args)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.count--;
                    if (this.taskQueue.length) {
                        this.taskQueue.shift()();
                    }
                });
            this.count++;
        };
    }
}

function PromiseFinally(callback) {
    return this.then((value) => {
        Promise.resolve(callback()).then(() => {
            value;
        });
    }).catch((e) => {
        Promise.reject(callback()).then(() => {
            throw e;
        });
    });
}
