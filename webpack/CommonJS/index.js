const str = `require('./moduleA');const str = require('./moduleB');console.log(str);`;

const functionWrapper = ["function (require, module, exports) {", "}"];

// 1. 将我们的文件进行包裹，成为一个字符串函数
const result = functionWrapper[0] + str + functionWrapper[1];

// 调用node自带的vm模块，把字符串result变成可执行的函数
const vm = require('vm')

vm.runInNewContext
