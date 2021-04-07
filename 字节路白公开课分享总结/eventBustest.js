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
            console.log("超过最大监听");
            return this;
        }
        this.events[event].push(cb);
        return this;
    }

    emit(event, ...args) {
        if (this.events[event] === null) {
            console.log("监听已取消");
            return this;
        } else {
            this.events[event].forEach((cb) => cb.apply(this, args));
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
            this.events[event] = this.events[event].filter((item) => item !== cb);
        }
        return this;
    }
}
