//利用Promise对异步请求限制并发的数量

class LimitPromise {
    constructor(max) {
        //最大并发数
        this._max = max;
        //当前正在执行的任务数量
        this.count = 0;
        //等待执行的任务队列
        this.taskQueue = [];
    }
    /**
     * 调用器，将要限制并发的异步函数传入，返回一个Promise
     * callBack 需要执行的函数，必须是async函数或者Promise
     * args 需要执行的函数的参数
     * return 返回一个新的Promise
     */
    call(callBack, ...args) {
        return new Promise((resolve, reject) => {
            // 获取需要执行的函数
            const task = this.creatTask(callBack, args, resolve, reject);
            if (this.count > this._max) {
                //超过并发了，将待执行的任务推入队列
                this.taskQueue.push(task);
            } else {
                task();
            }
        });
    }
    /**
     * 
     * @param {*} callBack 实际执行的函数
     * @param {*} args 执行函数的参数
     * @param {*} resolve 被执行函数的resolve
     * @param {*} reject 被执行函数的reject
     */
    creatTask(callBack, args, resolve, reject) {
        return () => {
            //利用Promise.finally()，无论执行函数的结果如何，都会执行传入的函数。
            callBack(...args)
                .then(resolve)
                .catch(reject)
                .finally(() => {
                    //执行完一个将当前执行数量--
                    this.count--;
                    if (this.taskQueue.length) {
                        //当队列里还有待执行任务时，取出队列内需要执行的函数。（先进先出）
                        const task = this.taskQueue.shift();
                        task();
                    } else {
                    }
                });
            // 在异步排队执行时，将正在执行的任务数量记录下来++
            this.count++;
        };
    }
}
