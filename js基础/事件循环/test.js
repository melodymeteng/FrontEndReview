console.log("start");
setTimeout(() => {
    console.log(2);
    Promise.resolve().then(() => {
        console.log(3);
    });
}, 1000);
new Promise((resolve, reject) => {
    console.log(4);
    setTimeout(() => {
        console.log(5);
        resolve(6);
    }, 0);
}).then((res) => {
    console.log(7);
    setTimeout(() => {
        console.log(res);
    }, 500);
});

/*------------*/

console.log("start");
setTimeout(() => {
    console.log(2);
    Promise.resolve().then(() => {
        console.log(3);
    });
}, 0);
new Promise((resolve, reject) => {
    console.log(4);
    setTimeout(() => {
        console.log(5);
        resolve(6);
    }, 0);
}).then((res) => {
    console.log(7);
    setTimeout(() => {
        console.log(res);
    }, 0);
});

/*------------*/

const p = function () {
    return new Promise((resolve, reject) => {
        const p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1);
            }, 0);
            resolve(2);
        });
        p1.then((res) => {
            console.log(res);
        });
        console.log(3);
        resolve(4);
    });
};
p().then((res) => {
    console.log(res);
});
console.log("end");

new Promise((resolve) => {
    resolve();
})
    .then(() => {
        console.log(0);
    })
    .then(() => {})
    .then(() => {
        return 4;
    })
    .then((res) => {
        console.log(res);
    });

new Promise((resolve) => {
    resolve();
})
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    });

Promise.resolve()
    .then(() => {
        console.log(0);
        return Promise.resolve(4);
    })
    .then((res) => {
        console.log(res);
    });

Promise.resolve()
    .then(() => {
        console.log(1);
    })
    .then(() => {
        console.log(2);
    })
    .then(() => {
        console.log(3);
    })
    .then(() => {
        console.log(5);
    })
    .then(() => {
        console.log(6);
    });

/*
1、
start
4
5
7
6
2
3
*/

/*
2、
start
4
2
3
5
7
6
*/

/*
3、
3
end
2
4
*/
