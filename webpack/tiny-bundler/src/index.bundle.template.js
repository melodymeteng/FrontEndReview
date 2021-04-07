(function () {
    // 模块执行函数
    var moduleList = [
        /* template-module-list */
    ];
    // 模块依赖的映射
    var moduleDepIdList = [
        /* template-module-dep-id-list */
    ];
    function require(id, parentId) {
        var currentModuleId = parentId !== undefined ? moduleDepIdList[parentId][id] : id;
        var module = { exports: {} };
        var moduleFunc = moduleList[currentModuleId];
        moduleFunc((id) => require(id, currentModuleId), module, module.exports);
        return module.exports;
    }
    require(0);
})();

