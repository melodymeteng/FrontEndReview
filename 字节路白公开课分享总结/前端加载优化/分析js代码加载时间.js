const jsTimer = function(target,name,descriptor){
    const val = descriptor.value;
    descriptor.value = async function(){
        console.time(name);
        const res = await val.apply(this,arguments);
        console.timeEnd(name);
        return res
    }
    return descriptor
}

// 通过装饰器可以得到函数getInfo运行完成总共花了多少时间，console.time(name) console.timeEnd(name) ,name是函数名，value是被装饰的函数体

// class Test{
//     @jsTimer
//     getInfo(){
//         setTimeout(function(){console.log(1)},4000)
//     }
// }