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
            this._xhr = _this.XHR();
            this.overwrite(this);
        };
    }

    overwrite(proxyXHR) {
        for (key in proxyXHR._xhr) {
            if (typeof proxyXHR[key] === "function") {
                this.overwriteMethod(key, proxyXHR);
            } else {
                this.overwriteAttributes(key, proxyXHR);
            }
        }
    }

    overwriteMethod(key, proxyXHR) {
        let beforeHooks = this.beforeHooks;
        let afterHooks = this.afterHooks;
        proxyXHR[key] = (...args) => {
            if (beforeHooks[key]) {
                const beforeRes = beforeHooks[key].apply(proxyXHR, args);
                if (beforeRes === false) return;
            }
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);
            if (afterHooks[key]) {
                const afterRes = afterHooks[key].call(proxyXHR._xhr, res);
                if (afterRes === false) return;
            }
            return res;
        };
    }

    overwriteAttributes(key, proxyXHR) {
        Object.defineProperty(proxyXHR, key, this.setPropertyDescriptor(key, proxyXHR));
    }

    setPropertyDescriptor(key, proxyXHR) {
        let obj = Object.create(null);
        let beforeHooks = this.beforeHooks;
        obj.set = function (val) {
            if (key.startWith("on")) {
                proxyXHR["__" + key] = val;
                return;
            }
            if (beforeHooks[key]) {
                this._xhr[key] = function (...args) {
                    beforeHooks[key].call(proxyXHR);
                    val.apply(proxyXHR, args);
                };
                return;
            }
            this._xhr[key] = val;
        };
        obj.get = function () {
            return proxyXHR["__" + key] || this._xhr[key];
        };
        return obj;
    }
}
