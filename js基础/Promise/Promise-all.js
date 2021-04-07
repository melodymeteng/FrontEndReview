//Promise.all 实现

//题外tips 当通过[i]给数组内赋值时，比如i=6，那么js会给这个数组预留0-6索引的内存空间，是empty
const arr = [];
arr[6] = 1;
arr.length === 7;
function PromiseAll(promiseArray) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promiseArray)) {
            return reject(new Error("必须传入数组"));
        } else {
            let len = promiseArray.length;
            let res = [];
            let counter = 0; //计数器
            for (let i = 0; i < len; i++) {
                //Promise.resolve()，无论传入的参数是什么类型的，都会被转成Promise，这样then拿到的结果就是参数的结果或他本身。
                Promise.resolve(promiseArray[i])
                    .then((value) => {
                        counter++;
                        res[i] = value;
                        if (counter === len) {
                            resolve(res);
                        }
                    })
                    .catch((e) => reject(e));
            }
        }
    });
}

const pro1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});

const pro2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
});

const pro3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(3);
    }, 3000);
});

const proAll = PromiseAll([pro1, pro2, pro3])
    .then((res) => {
        console.log(res); //3s后打印[1,2,3]
    })
    .catch((e) => {
        new Error(e);
    });
