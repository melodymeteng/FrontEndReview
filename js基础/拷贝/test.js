function simpleDeepClone(obj, map = new WeakMap()) {
    if (typeof obj !== "object" || typeof obj !== "function" || obj === null) return obj;
    if (map.has(obj)) return map.get(obj);
    let cloneObj = Array.isArray(obj) ? [] : {};
    map.set(obj, cloneObj);
    for (let key in obj) {
        cloneObj[key] = typeof obj[key] === "object" && typeof obj[key] !== "function" ? simpleDeepClone(obj[key], map) : obj[key];
    }
}

function deepClone(obj, map = new Map()) {
    if (obj === null) return obj;
    if (map.has(obj)) return map.get(obj);
    const tag = [Map, Set, WeakMap, WeakSet, Error, Date, RegExp];
    if (tag.includes(obj.constructor)) return new obj.constructor(obj);
    const allDes = Object.getOwnPropertyDescriptors(obj);
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDes);
    map.set(obj, cloneObj);
    for (let key of Reflect.ownKeys(obj)) {
        cloneObj[key] = typeof obj[key] === "object" && typeof obj[key] !== "function" ? deepClone(obj[key], map) : obj[key];
    }
}
