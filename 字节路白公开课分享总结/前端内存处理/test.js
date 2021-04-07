function sizeOf(obj) {
    if (obj === null) return 0;
    const type = typeof obj;
    switch (type) {
        case "string": {
            return obj.length * 2;
        }
        case "boolean": {
            return 4;
        }
        case "number": {
            return 8;
        }
        case "object": {
            if (Array.isArray) {
                return obj.map(sizeOf).reduce((res, current) => {
                    res + current;
                }, 0);
            } else {
                sizeOfObject(obj);
            }
        }
        default:
            return 0;
    }
}

const wSet = new WeakSet();
function sizeOfObject(obj) {
    let bytes = 0;
    for (let key in obj) {
        bytes += sizeOf(key);
        if (typeof obj[key] === "object" && obj[key] !== null) {
            if (wSet.has(obj[key])) continue;
            wSet.add(obj[key]);
        }
        bytes += sizeOf(obj[key]);
    }
}
