class EventBus {
    constructor(max) {
        this.max = max;
        this.events = {};
    }

    on(event, cb) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        if (this.events[event].length > this.max) {
            console.warn("xxx最大了");
            return this;
        }
        this.events[event].push(cb);
        return this;
    }

    emit(event, ...args) {
        let cbs = this.events[event];
        if (cbs === null) {
            console.log("时间已移除");
        } else {
            cbs.forEach((item) => item.apply(this, args));
        }

        return this;
    }

    once(event, cb) {
        const func = (...args) => {
            this.off(event, func);
            cb.apply(this, args);
        };
        this.on(event, func);
        return this;
    }

    off(event, cb) {
        if (!cb) {
            this.events[event] = null;
        } else {
            this.events[event] = this.events[event].filter((item) => item != cb);
        }
        return this;
    }
}
