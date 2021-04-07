// 1、接受执行前需要执行的hooks和执行后需要执行的hooks，保存一下原先的window.XMLHttpRequest
// 2、重写window.XMLHttpRequest,给这个构造函数里添加一个_xhr属性为原先保存好的XMLHttpRequest的实例
// 3、开始重写，传入构造函数XMLHttpRequest的this，遍历构造函数内的_xhr实例对象，如果这个对象的属性时函数，那么调用函数重写，如果是属性，调用属性重写
// 4、重写函数方法，如果beforehooks中有，那么执行这个hooks中的函数，并且这个函数指向构造函数XMLHttpRequest，然后执行实例_xhr上的方法，然后再查看
// afterhooks中有没有，如果有执行这个hooks中函数，这个函数需要指向实例的this。
// 5、重写属性，利用Object.defineProperty()的访问描述符setter/getter进行重写
// 6、set里直接重写属性，类似于重写函数。将before中hook执行，并且指向构造函数XMLHttpRequest，如果没有就直接给实例上属性set val即可。

class XhrHook {
    constructor(beforeHooks = {}, afterHooks = {}) {
        // 将原先的XMLHttpRequset保存好
        this.XHR = window.XMLHttpRequest;
        this.beforeHooks = beforeHooks;
        this.afterHooks = afterHooks;
        this.init();
    }
    init() {
        // 保存一下this，保证_this指向XhrHook的构造函数
        let _this = this;
        // 把window.XMLHttpRequest重写
        window.XMLHttpRequest = function () {
            // 这里的this指向重写的函数，在重写的函数中保存一个xhr属性，这个xhr是原有的XMLHttpRequest
            this._xhr = new _this.XHR();
            _this.overwrite(this);
        };
    }

    /**
     * @param {这个就是重写后的window.XMLHttpRequest构造函数的this} proxyXHR
     */
    overwrite(proxyXHR) {
        //for...in 遍历proxyXHR._xhr，这个proxyXHR._xhr就是原先window.XMLHttpRequset实例化后得到的对象，也就是init里this._xhr = new _this.XHR()这一步
        for (let key in proxyXHR._xhr) {
            // 判断这个对象中的值是方法(function)还是属性，像原始的XMLHttpRequest中,open(...)就是一个方法，而onerror就是一个属性，方法是直接调用的，属性时用来
            // 赋值给一个函数来得到结果
            if (typeof proxyXHR[key] === "function") {
                // 如果是方法，那么就把原先window.XMLHttpRequset实例化后得到的对象的key，还有这个重写后的window.XMLHttpRequest构造函数的this传入进去
                this.overwriteMethod(key, proxyXHR);
                continue;
            }
            // 如果是属性那么调用重写属性的函数
            this.overwriteAttributes(key, proxyXHR);
        }
    }

    /**
     *
     * @param {原先window.XMLHttpRequset实例化后得到的对象的key，这里指的是方法} key
     * @param {重写后的window.XMLHttpRequest构造函数的this} proxyXHR
     * @param {其中执行beforeHooks中的副作用函数时指向构造函数XMLHttpRequest，是因为在实例化xhr后调用方法，如果想在调用实例方法前有hooks，那么就必须在构造函数上添加}
     * @param {其中执行afterHooks中的副作用函数时指向实例_xhr，是因为在实例化xhr后调用方法，如果想在调用实例方法后有hooks，那么就必须在实例上添加一些副作用}
     */
    overwriteMethod(key, proxyXHR) {
        // beforeHooks可以拦截window.XMLHttpRequset构造函数中的方法，在该方法执行前时，给它添加一些hooks
        let beforeHooks = this.beforeHooks;
        // beforeHooks可以拦截window.XMLHttpRequset构造函数中的方法，在该方法执行后时，给它添加一些hooks
        let afterHooks = this.afterHooks;
        // 重写window.XMLHttpRequset构造函数内的方法，
        proxyXHR[key] = (...args) => {
            // 如果beforeHooks里定义了要拦截的方法，也就是当前key这个方法在beforeHooks中也有定义
            if (beforeHooks[key]) {
                // 如果有，那么在执行重写后window.XMLHttpRequset的方法时（proxyXHR[key]），会先执行hooks中的函数beforeHooks[key]，这个时候需要把
                // hooks中的函数指向XMLHttpRequset构造函数，以便可以有更多的hook操作。
                const beforeRes = beforeHooks[key].apply(proxyXHR, args);
                // 如果在hooks中的函数return了false，那么就直接终止实例proxyXHR._xhr执行key方法。
                if (beforeRes === false) return;
            }
            // 执行实例上真正的方法
            const res = proxyXHR._xhr[key].apply(proxyXHR._xhr, args);
            // 如果传入了执行方法后的一些hook，那么就执行hooks中的函数afterHooks[key]，并把hooks中的函数指向实例，因为这个时候已经得到结果了。
            if (afterHooks[key]) {
                const afterRes = afterHooks[key].call(proxyXHR._xhr, res);
                // 如果在hooks中的函数return了false，那么就直接终止实例proxyXHR._xhr执行key方法后返回结果
                if (afterRes === false) return;
            }
            return res;
        };
    }

    /**
     *
     * @param {原先window.XMLHttpRequset实例化后得到的对象的key，这里指的是属性} key
     * @param {重写后的window.XMLHttpRequest构造函数的this} proxyXHR
     */
    overwriteAttributes(key, proxyXHR) {
        // Object.defineProperty重写key这个属性
        Object.defineProperty(proxyXHR, key, this.setPropertyDescriptor(key, proxyXHR));
    }
    setPropertyDescriptor(key, proxyXHR) {
        let obj = Object.create(null);
        // 这里的this指向类XhrHook
        let beforeHooks = this.beforeHooks;
        obj.set = function (val) {
            // 这里的this指向proxyXHR,因为是对proxyXHR这个对象的属性进行重写，所以这里的this === proxyXHR
            // 不对on开头的属性进行重写
            if (!key.startWith("on")) {
                // 如果不是on开头的，把它变成__key这种格式的属性
                proxyXHR["__" + key] = val;
                return;
            }
            // 如果hooks里有对属性key进行添加副作用
            if (beforeHooks[key]) {
                // 那么就给window.XMLHttpRequest上的实例_xhr中的属性赋值一个函数
                this._xhr[key] = function (...args) {
                    // 执行beforeHooks中的属性key的副作用方法
                    beforeHooks[key].call(proxyXHR);
                    // 然后保证原来window.XMLHttpRequest上属性的this指向window.XMLHttpRequest构造函数
                    val.apply(proxyXHR, args);
                };
                return;
            }
            // 如果hooks里没有，那么就直接赋值给原来实例上的属性
            this._xhr[key] = val;
        };
        obj.get = function () {
            // 返回不是on的方法，如果是on那么返回实例上的属性（看hooks里是否有，有就是被重写了，没有就是原本的）
            return proxyXHR["__" + key] || this._xhr[key];
        };
        return obj;
    }
}

new XhrHook({
    open: function (fangfa, url, bool) {
        console.log("open", fangfa, url, bool);
    },
    onload: function () {
        console.log("onload");
    },
    onreadystatechange: function () {
        console.log("onreadystatechange");
    },
    onerror: function () {
        console.log("onerror");
    },
});

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://www.baidu.com", true);
xhr.send();
xhr.onreadystatechange = function (res) {
    console.log("statechange", res);
};
xhr.onerror = function (err) {
    console.log("error", err);
};
