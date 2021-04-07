// 加载chunk文件时使用全局的__JSONP函数，传入chunkId还有要加载的函数（加载的函数就是正常的require过程）
__JSONP("1", function (require, module, exports) {
    module.exports = "hello world";
});
