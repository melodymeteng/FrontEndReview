function limitLoad(urls, handler, limit) {
    // 先浅拷贝一下数组，不要改变原数组
    const copyarr = [].concat(urls);
    // 等待执行的任务数组
    let promiseArr = [];
    // 给执行任务数组赋值，splice(0,limit)可以把浅拷贝后的数组改变，截取出来前limit个放到待执行任务数组中，然后通过map枚举出来，
    // handler(url)已经开始执行传入函数（业务中可以对应已经开始请求接口），handler(url)会return一个Promise，这个Promise暂时是
    // pending状态，只有在setTimeout的定时到了拿到结果后（服务端响应）才会变为决议状态，.then()才能继续执行，所以promiseArr放入的
    // 都是执行handler(url)后返回的pending状态的Promise。这些Pending状态的Promise.then()中回调函数保持了map中index的引用(闭包)
    promiseArr = copyarr.splice(0, limit).map((url, index) => {
        return handler(url).then(() => {
            return index;
        });
    });
    // 执行Promise.race(promiseArr)，看promiseArr中新的limit个Promise(handler(url)返回的Promise)谁最先执行完变成决议状态，
    // 执行完后得到了新的Promise，可以通过.then()拿到之前在map中保存的index结果
    let p = Promise.race(promiseArr);
    // console.log("p", p); 这时还是pending状态，因为handler(url)返回的Promise中需要等待setTimeout
    // setTimeout(() => {
    //     console.log("p", p); 如果这么打印那就是拿到了结果，是full..状态
    // }, 5000);
    for (let i = 0, len = copyarr.length; i < len; i++) {
        // for循环还没执行任务的数组（因为之前的splice操作改变了copyarr数组），所以现在copyarr数组中都是未执行的任务，p.then()会在
        // handler(url)返回的Promise内的setTimeout时间到了执行resolve后去执行map中.then()回调的return index，然后再执行for循环
        // 中的p.then()拿到index，也就是执行任务数组promiseArr中索引为index的那个任务执行完了。这个时候从未执行任务数组copyarr中拿出
        // 一个未执行的任务，执行与map中一样的操作，最终返回的也是index索引。一个萝卜一个坑，出去一个立马填进去一个。前面已经把p.then()
        // 赋值给了p，p被重新赋值后并且return Promise.race(promiseArr)，这样下一次循环可以继续调用p.then()拿到执行完任务的索引，
        // 形成了链式调用。p.then().then().then()
        p = p.then((value) => {
            promiseArr[value] = handler(copyarr[i]).then(() => {
                return value;
            });
            return Promise.race(promiseArr);
        });
    }
    // 整体的流程就是 handler(url)得到的新Promise.then().then()拿到了完成任务的索引，然后继续链式调用.then()，完成所有的任务
}

function loadImg(url) {
    return new Promise((resolve, reject) => {
        console.log("-----" + url.info + "start");
        setTimeout(() => {
            console.log(url.info + "isOK");
            resolve();
        }, url.time);
    });
}

const urls = [
    {
        info: "aaa",
        time: "3000",
    },
    {
        info: "bbb",
        time: "2000",
    },
    {
        info: "ccc",
        time: "1000",
    },
    {
        info: "ddd",
        time: "1500",
    },
    {
        info: "eee",
        time: "4000",
    },
    {
        info: "fff",
        time: "0",
    },
    {
        info: "g",
        time: "2500",
    },
];

limitLoad(urls, loadImg, 3);
