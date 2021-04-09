class XhrHook {
    constructor(beforeHooks = {}, afterHooks = {}) {
        this.beforeHooks = beforeHooks;
        this.afterHooks = afterHooks;
        this.XHR = window.XMLHttpRequest;
        this.init();
    }

    init() {
        let _this = this;
        window.XMLHttpRequest = function () {
            this._xhr = new _this.XHR();
            _this.overwrite(this);
        };
    }

    overwrite(proxyXHR) {
        for (let key in proxyXHR) {
            if (typeof proxyXHR[key] === "function") {
                this.overwriteMethod(key, proxyXHR);
                continue;
            }
            this.overwriteAttributes(key, proxyXHR);
        }
    }

    overwriteMethod(key, proxyXHR) {
        let afterHooks = this.afterHooks;
        let beforeHooks = this.beforeHooks;
        proxyXHR[key] = (...args) => {
            if (beforeHooks[key]) {
                const beforeRes = beforeHooks[key].apply(proxyXHR, args);
                if (beforeRes === false) return;
            }
            const res = proxyXHR[key].apply(proxyXHR._xhr, args);
            if (afterHooks[key]) {
                const afterRes = afterHooks[key].call(proxyXHR._xhr, res);
                if (afterRes === false) return;
            }
            return res;
        };
    }

    overwriteAttributes(key, proxyXHR) {
        Object.defineProperty(proxyXHR, key, this.setDescriptor(key, proxyXHR));
    }

    setDescriptor(key, proxyXHR) {
        let obj = Object.create(null);
        let beforeHooks = this.beforeHooks;
        obj = {
            set(value) {
                if (!key.startWith("on")) {
                    proxyXHR["___" + key] = value;
                    return;
                }
                if (beforeHooks[key]) {
                    this._xhr[key] = function (...args) {
                        beforeHooks[key].call(proxyXHR);
                        value.apply(proxyXHR, args);
                    };
                    return;
                }
                this._xhr[key] = value;
            },
            get() {
                return proxyXHR["___" + key] || this._xhr[key];
            },
        };
        return obj;
    }
}
