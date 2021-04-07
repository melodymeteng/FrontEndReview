(function () {
    // HMR可以通过传入修改的模块ID moduleID直接找到moduleList中对应的内容进行替换就完成了热更新，就不需要重启webpack。
    var moduleList = [
        // // 模块1
        // function (require, module, exports) {
        //     // index.js中的内容
        //     const moduleA = require("./moduleA");
        //     console.log("moduleA", moduleA);
        // },
        // // 模块2
        // function (require, module, exports) {
        //     // moduleA.js中的内容
        //     module.exports = +new Date();
        // },
        function (require, module, exports) {
            require.ensure("1").then((res) => console.log(res));
        },
    ];

    // 全局缓存chunk的状态
    var cache = {};

    // 模块之间的关系依赖。
    // var moduleDepIdList = [{ "./moduleA": 1 }, {}];
    var moduleDepIdList = [];
    // require函数，初始接受一个id:0,parentId:undefined，这样先去moduleList中找到第一个函数，然后把一个闭包函数作为参数传递到moduleList[0]函数中当require参数使用，这个闭包函数接收一个id，然后去执行闭包函数也就是被当做require参数的(id) => require(id, currentModuleId)，并且这个闭包函数始终保持着对上一次require函数内currentModuleId的引用，这样在require("./moduleA")时，'./moduleA'被作为id传入进去，然后执行require(id, currentModuleId)，这里id:./moduleA,parentId:0，parentId就是上一次执行require的初始id也就是传入的闭包函数对上一次require函数内currentModuleId的引用，这样就在moduleDepIdList中找到了moduleDepIdList[0]['./moduleA'] === 1，然后再去执行moduleList[1]这个函数，moduleList[1]这个函数接收了require参数（闭包函数）、module参数（require函数内定义的module对象）、exports参数（require函数内定义的module对象的exports属性），这时模块2（moduleList[1]）内执行了 module.exports = +new Date();那么require中定义的module对象的exports属性被赋值了+new Date()，最后在require函数末尾把module.export return出去，拿到结果。拿到的结果赋值给了模块1中const声明的变量moduleA，随后console.log打印。
    function require(id, parentId) {
        var currentModuleId = parentId !== undefined ? moduleDepIdList[parentId][id] : id;
        var module = { exports: {} };
        var moduleFunc = moduleList[currentModuleId];
        moduleFunc((id) => require(id, currentModuleId), module, module.exports);
        return module.exports;
    }

    // 在chunk文件中调用全局的__JSONP方法，从全局缓存中拿出数组[resolve,promise]，然后将chunk文件传入的模块加载函数执行(这一步就是正常的require加载)，加载完毕后，将结果resolve出去，这样在require.ensure('xxx')后就可以.then()拿到加载的结果
    window.__JSONP = function (chunkId, moduleFunc) {
        var currentChunkStatus = cache[chunkId];
        var resolve = currentChunkStatus[0];
        var module = { exports: {} };
        moduleFunc(require, module, module.exports);
        resolve(module.exports);
    };

    // 调用require.ensure可以异步加载模块也叫动态加载模块，也就是webpack中的打chunk
    require.ensure = function (chunkId, parentId) {
        var currentModuleId = parentId !== undefined ? moduleDepIdList[parentId][chunkId] : chunkId;
        var currentChunkStatus = cache[currentModuleId];
        // 如果全局缓存中没有，那么需要通过JSONP的形式加载chunk
        if (currentChunkStatus === undefined) {
            var $script = document.createElement("script");
            $script.src = "./chunk_" + chunkId + ".js";
            document.body.appendChild($script);
            // script异步加载chunk文件，在chunk文件中调用全局的__JSONP方法。
            var promise = new Promise(function (resolve) {
                // 记录一下resolve
                var chunkCache = [resolve];
                chunkCache.status = true;
                // 放到全局缓存中
                cache[currentModuleId] = chunkCache;
            });
            cache[currentModuleId].push(promise);
            return promise;
        }
        if (currentChunkStatus.status === true) {
            return currentChunkStatus[1];
        }
        return chunkCache[0];
    };

    // require(0);

    moduleList[0](require, null, null);
})();
