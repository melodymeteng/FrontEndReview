// on注册事件，emit调用事件，off取消监听回调，once注册一次性事件只触发一次
class EventBus {
    constructor(max) {
        this.events = {};
        this.maxListener = max;
    }
    
    on(event, cb) {
        if (!this.events[event]) {
            // 一个事件可能有多个监听，把这个事件的全部监听放到数组里，触发一次这个事件，把这个事件的全部监听都执行掉
            this.events[event] = [];
        }
        // 拦截最大监听数量
        if (this.events[event].length >= this.maxListener) {
            console.warn(`当前事件${event}超过了最大监听数目`);
            return this;
        }
        this.events[event].push(cb);
        // return this 是为了可以链式调用，确保链式调用时this指向正确。例如 event.on('add',fun()).emit('add',1,2,3)注册完立马调用
        return this;
    }

    emit(event, ...args) {
        const cbs = this.events[event];
        // 如果事件上的所有回调都被移除了（调用了off）那么抛出错误
        if (cbs === null) {
            console.log(`${event} event is not registered`);
            // 如果有，那么把事件拿出来执行即可。apply保证this的指向和参数正确
        } else {
            cbs.forEach((cb) => cb.apply(this, args));
        }
        return this;
    }

    once(event, cb) {
        // 定义一个只要被执行调用了就立马调用off取消的函数
        const func = (...args) => {
            // 只要调用了第一次就先自动调用off取消监听
            this.off(event, func);
            // 保证回调原来的this指向和参数
            cb.apply(this, args);
        };
        // 把这个函数当做新的回调传到on里面
        this.on(event, func);
        return this;
    }

    off(event, cb) {
        // 如果没有传入回调，那么就把这个事件下的全部监听都移除掉
        if (!cb) {
            this.events[event] = null;
            // 如果传入回调了，那么就通过数组的filter方法，把不是cb的监听回调保留下来，移除cb
        } else {
            this.events[event] = this.events[event].filter((item) => item !== cb);
        }

        return this;
    }
}

const add = (a, b) => console.log(a + b);
const log = (...args) => console.log(...args);
const event = new EventBus();

event.on("add", add).emit("add", 1, 2);
event.on("log", log);
// event.emit("add", 1, 2); //3
event.emit("log", "hi:eventbus!"); //hi:eventbus!
event.off("add");
event.emit("add", 2, 3); //Error: add event is not registered
event.once("once", add);
event.emit("once", 1, 2); //3
event.emit("once", 1, 2);
event.emit("once", 1, 2);
