// number:64位存储，8字节
// string:每个长度 2字节
// boolean:4字节

// 1.计算机基础，js内存基础考察
// 2.递归
// npm 上object-sizeof

const testObj = {
    a: 111,
    b: "cccc",
    222: false,
    c: "xxxx",
    d: "xxxx",
};
// xxxx同一个值被两个Key引用时，value xxxx 是只占了一个内存

const wSet = new WeakSet();

function sizeOfObject(object) {
    if (object === null) return 0;
    let bytes = 0;
    // 对象中的key也是占用内存空间的,将对象的key取出来循环，也可以for...in，或者Reflect.ownKeys()
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        // 因为对象的key也是占用内存的，所以不管value是什么情况，都需要提前把key占用的字节算进去
        bytes += sizeOf(key);
        // 如果value是对象或者数组，那么首先判断WeakSet里有没有这个value，因为如果两个key都引用了同一个value，并且这个value是引用类型（对象或数组）
        // 那么这个value只会占用一遍内存，用WeakSet是因为，第一、它只可以使用引用类型做Key。第二、他之间的key-value间是弱引用类型，可以及时释放内存
        if (typeof object[key] === "object" && object[key] !== null) {
            if (wSet.has(object[key])) continue;
            wSet.add(object[key]);
        }
        // 如果这个value不在WeakSet中，将其add进去后，或者这个value是基本类型，那么将这个value传入到sizeOf中进行计算
        bytes += sizeOf(object[key]);
    }
    return bytes
}

function sizeOf(object) {
    const objType = typeof object; // 或者Object.prototype.toString.call(object) '[object Object]' '[object Array]'
    // objType == string,字符每个字占用2字节，Boolean占用4字节，number占用8字节，object需要区分数组和对象，如果是数组那么就通过map方法
    // 调用sizeOf函数本身，map枚举出来的元素会被传入sizeOf函数，即使有多重数组嵌套也可以完成递归，然后继续用reduce方法计算结果，reduce方法
    // 设置一个初始值0，然后res是上一次结果（执行sizeOf的结果），加上当前结果。
    // 对象的计算稍微复杂，可以单独提取出来一个函数
    switch (objType) {
        case "string": {
            return object.length * 2;
        }
        case "boolean": {
            return 4;
        }
        case "number": {
            return 8;
        }
        case "object": {
            if (Array.isArray(object)) {
                return object.map(sizeOf).reduce((res, current) => res + current, 0);
            } else {
                return sizeOfObject(object);
            }
        }
        default:
            return 0;
    }
}

var b = sizeOf(testObj);
console.log(b);
