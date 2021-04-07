const PromiseFinally = function (callback) {
    return this.then((value) => {
        Promise.resolve(callback()).then(() => value);
    }).catch((e) =>
        Promise.reject(callback()).then(() => {
            throw e;
        })
    );
};
