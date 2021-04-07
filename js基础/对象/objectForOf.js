const obj = { a: 1, b: 2 };
//给对象设置Symbol.iterator属性,iterator迭代器会返回一个next函数，
//调用next函数时会返回{value:xxx,done:xxx}，done为true时就代表没有可以遍历的值了
obj[Symbol.iterator] = function () {
    let index = 0,
        self = this,
        keys = Object.keys(self);
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
