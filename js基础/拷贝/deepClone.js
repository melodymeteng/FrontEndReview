const mapType = "[object Map]";
const setType = "[object Set]";
const objType = "[object Object]";
const argsType = "[object Arguments]";
const arrType = "[object Array]";

const booleanType = "[object Boolean]";
const dateType = "[object Date]";
const errorType = "[object Error]";
const regexpType = "[object RegExp]";
const funcType = "[object Function]";
const symbolType = "[object Symbol]";
const strType = "[object String]";
const numType = "[object Number]";
const deepTypeArr = [mapType, setType, objType, argsType, arrType];
isObj = (obj) => (typeof obj === "object" || typeof obj === "function") && obj !== null;
function symbolClone(sym) {
    return sym.valueOf();
}
function regexpClone(reg) {
    const reFlags = /\w*$/;
    const result = new reg.constructor(reg.source, reFlags.exec(reg));
    result.lastIndex = reg.lastIndex;
    return result;
}
function funcClone(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        console.log("普通函数");
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            console.log("匹配到函数体：", body[0]);
            if (param) {
                const paramArr = param[0].split(",");
                console.log("匹配到参数：", paramArr);
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}
function cloneOtherType(obj, type) {
    switch (type) {
        case booleanType:
        case dateType:
        case strType:
        case numType:
        case errorType:
            return new obj.constructor(obj);
        case symbolType:
            return symbolClone(obj);
        case regexpType:
            return regexpClone(obj);
        case funcType:
            return funcClone(obj);
    }
}
function clone(obj, map = new Map()) {
    if (!isObj(obj)) return obj;
    let type = Object.prototype.toString.call(obj);
    let cloneObj;
    if (deepTypeArr.includes(type)) {
        cloneObj = new obj.constructor(obj);
    } else {
        return cloneOtherType(obj, type);
    }
    if (map.get(obj)) {
        return map.get(obj);
    }
    map.set(obj, cloneObj);
    if (type === setType) {
        obj.forEach((item) => {
            cloneObj.add(clone(item, map));
        });
        return cloneObj;
    }
    if (type === setType) {
        obj.forEach((item, index) => {
            cloneObj.set(index, clone(item, map));
        });
        return cloneObj;
    }
    for (let key in obj) {
        cloneObj[key] = isObj(obj[key]) ? clone(obj[key], map) : obj[key];
    }
    return cloneObj;
}

// 只拷贝对象数组
function simpleDeepClone(obj, map = new WeakMap()) {
    if (typeof obj !== "object" || obj === null) return obj;
    if (map.get(obj)) return map.get(obj);
    let cloneObj = Array.isArray(obj) ? [] : {};
    map.set(obj, cloneObj);
    for (let key in obj) {
        cloneObj[key] = Array.isArray(obj[key]) ? obj[key] : simpleDeepClone(obj[key], map);
    }
    return cloneObj
}

//判断是对象或者函数
isObjOrFun = (obj) => (typeof obj === "object" || typeof obj === "function") && obj !== null;
function deepCopy(target, map = new WeakMap()) {
    //利用WeakMap来存储上一次递归得到的cloneTarget，这样子可以解决循环引用问题
    if (map.get(target)) return map.get(target);
    //制定一些可以直接new(...)作为拷贝后的对象。target.constructor指向的就是target的构造函数
    const DataType = [Map, Set, Date, RegExp, WeakMap, WeakSet, String, Number, Error, Boolean];
    if (DataType.includes(target.constructor)) return new target.constructor(target);
    //获取target的全部描述符，不拿到描述符的话，在拷贝一些writable为false的属性时可能会变成true
    let allDesciptor = Object.getOwnPropertyDescriptors(target);
    //创建一个新的对象，新对象的原型和target的原型相关联，并且新对象的属性描述符也和target的属性描述符一致
    let cloneTarget = Object.create(Object.getPrototypeOf(target), allDesciptor);
    //set存储一下
    map.set(target, cloneTarget);
    // Object.keys() 仅仅返回自身的可枚举属性，不包括继承来的，更不包括Symbol属性
    // Object.getOwnPropertyNames() 返回自身的可枚举和不可枚举属性。但是不包括Symbol属性
    // Object.getOwnPropertySymbols() 返回自身的Symol属性
    // for...in 可以遍历对象的自身的和继承的可枚举属性，不包含Symbol属性
    // Reflect.ownkeys() 返回对象自身的所有属性，不管是否可枚举，也不管是否是Symbol。注意不包括继承的属性
    for (let key of Reflect.ownKeys(target)) {
        // 如果属性值还是引用类型，那么就进行递归继续逐层拷贝。
        cloneTarget[key] = isObjOrFun(target[key]) && typeof target[key] !== "function" ? deepCopy(target[key], map) : target[key];
    }
    return cloneTarget;
}
