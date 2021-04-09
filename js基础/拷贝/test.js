function simpleDeepClone(obj, map = new WeakMap()) {
    if (typeof obj !== "object" || obj === null) return obj;
    if (map.has(obj)) return map.get(obj);
    let cloneObj = Array.isArray(obj) ? [] : {};
    map.set(obj, cloneObj);
    for (let key in obj) {
        cloneObj[key] = typeof obj[key] === "object" ? simpleDeepClone(obj[key], map) : obj[key];
    }
    return cloneObj;
}

function deepClone(obj, map = new WeakMap()) {
    if (obj === null) return obj;
    if (map.has(obj)) return map.get(obj);
    const tag = [Set, Map, WeakMap, WeakSet, Date, Error, RegExp];
    if (tag.includes(obj.consturctor)) return new obj.consturctor(obj);
    const allDesc = Object.getOwnPropertyDescriptors(obj);
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc);
    map.set(obj, cloneObj);
    for (let key of Reflect.ownKeys(obj)) {
        cloneObj[key] = typeof obj[key] === "object" && typeof obj[key] !== "function" ? deepClone(obj[key], map) : obj[key];
    }
    return cloneObj;
}
