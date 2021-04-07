function PromiseAll(arr) {
    return new Promise((resolve, reject) => {
        if (!arr || arr.length === 0 || !Array.isArray(arr)) {
            reject(new Error("..."));
        } else {
            const res = [];
            const len = arr.length;
            let index = 0;
            for (let i = 0; i < len; i++) {
                Promise.resolve(arr[i])
                    .then((value) => {
                        res[i] = value;
                        index++;
                        if (index === len) resolve(res);
                    })
                    .catch((e) => reject(e));
            }
        }
    });
}

function PromiseRace(arr) {
    return new Promise((resolve, reject) => {
        if (!arr || arr.length === 0 || !Array.isArray(arr)) {
            reject(new Error("..."));
        } else {
            const len = arr.length;
            for (let i = 0; i < len; i++) {
                Promise.resolve(arr[i])
                    .then((value) => {
                        resolve(value);
                    })
                    .catch((e) => reject(e));
            }
        }
    });
}

function PromiseFinally(callback) {
    return this.then((value) => {
        Promise.resolve(callback()).then(() => value);
    }).catch((e) => {
        Promise.reject(callback()).then(() => e);
    });
}

const cacheMap = new Map();
function enableCache(target, name, descriptor) {
    const val = descriptor.value;
    descriptor.value = function (...args) {
        let cacheKey = name + JSON.stringify(args);
        if (!cacheMap.get(cacheKey)) {
            const cacheValue = Promise.resolve(val.apply(this, args)).catch((e) => {
                cacheMap.set(cacheKey, null);
            });
            cacheMap.set(cacheKey, cacheValue);
        }
        return cacheMap.get(cacheKey);
    };
    return descriptor
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
        return () => {
            caller(...args)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    this.count--;
                    if (this.taskQueue.length > 0) {
                        this.taskQueue.shift()();
                    }
                });
            this.count++;
        };
    }
}
