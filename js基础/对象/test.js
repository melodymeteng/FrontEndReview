obj[Symbol.iterator] = function () {
    var self = this;
    var keys = Object.keys(self);
    var index = 0;
    return {
        next() {
            if (index < keys.length) {
                return {
                    value: self[keys[index++]],
                    done: false,
                };
            } else {
                return {
                    value: undefined,
                    done: true,
                };
            }
        },
    };
};
