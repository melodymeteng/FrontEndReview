const path = require("path");
const fs = require("fs");

// 1、读取公共模板文件
const template = fs.readFileSync(path.resolve(__dirname, "index.bundle.template.js"), "utf-8");
// 2、读取内容文件
const target = fs.readFileSync(path.resolve(__dirname, "..", "index.js"), "utf-8");
// 3、把内容放到模板文件里
const content = template.replace("/* template */", target);
// 4、把最终的内容写入到dist/index.bundle.js中
fs.writeFileSync(path.resolve(__dirname, "dist/index.bundle.js"), content, "utf-8");
