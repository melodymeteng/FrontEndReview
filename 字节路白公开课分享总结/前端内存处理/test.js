function sizeof(obj) {
    if (obj === null) return 0;
    const type = typeof obj;
    switch (type) {
        case "string": {
            return obj.length * 2;
        }
        case "number": {
            return 8;
        }
        case "boolean": {
            return 4;
        }
        case "object": {
            if (Array.isArray(obj)) {
                return obj.map(sizeof).reduce((res, current) => res + current, 0);
            } else {
                return sizeofObj(obj);
            }
        }
    }
}

const wSet = new WeakSet();
function sizeofObj(obj) {
    let byte = 0;
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        byte += sizeof(keys[i]);
        if (typeof obj[keys[i]] === "object" && obj[keys[i]] !== null) {
            if (wSet.has(obj[keys[i]])) continue;
            wSet.add(obj[keys[i]]);
        }
        byte += sizeof(obj[keys[i]]);
    }
    return byte;
}
