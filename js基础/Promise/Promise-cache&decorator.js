//当一些Promise的结果是固定的，比如说一个接口返回的结果是很多页面都需要的，但是又没有一个全局的状态管理工具，那么可以利用Promise的缓存特性来对结果进行缓存

//装饰器decorator（es7）其实是Object.defineProperty(target,prop,descriptor)的语法糖，Object.defineProperty（）会对传入的目标对象的现有属性值做修改或者新增一个属性值。
//target：目标对象、prop：目标对象需要修改或新增的属性值，descriptor：要定义或者修改的属性描述符.
//属性描述符有数据描述符和存储描述符
/*
数据描述符
descriptor = {
    enumerable: false, 是否可枚举默认false
    configurable: true, true时才可以改变属性描述符或者删除改属性
    value: 数值/对象/函数等, 
    writable: true, 为true时属性的值才可以被改变否则只能读取，默认为false
};
*/
/*
存储描述符
descriptor = {
    enumerable: false,
    configurable: true,
    get:getters/undefined, 获取被用作属性的值
    set:setters/undefined,setter()会传入一个新值给赋值时的this对象。
};
*/

const cacheMap = new Map();
function enableCache(target, name, descriptor) {
    //这里的descriptor就是数据描述符
    //现将目标的属性（getInfo函数或者是其他的函数）存储起来；然后再改变descriptor.value为新的函数
    const val = descriptor.value;
    //目标属性传入的参数
    descriptor.value = function (...args) {
        const cacheKey = name + JSON.stringify(...args);
        //Promise.resolve(val.apply(this.args))这里得到的就是目标属性的结果，当catch报错时，不能把错误的信息存储在Map中
        //cacheValue得到的是已完成状态的Promise对象，将这个Promise对象存入Map中
        if (!cacheMap.get(cacheKey)) {
            const cacheValue = Promise.resolve(val.apply(this,args)).catch((e) => {
                cacheMap.set(cacheKey, null);
            });
            cacheMap.set(cacheKey, cacheValue);
        }
        //返回Map中存储的结果
        return cacheMap.get(cacheKey);
    };
    return descriptor;
}

class PromiseCache {
    //@enableCache就可以使用装饰器。需要注意的是：装饰器是代码编译时就生效了，并不是代码执行时才生效。
    // @enableCache
    // static async getInfo() {}
}
const promiseCache = new PromiseCache();
promiseCache.getInfo().then(value=>console.log(value)) //此时会把结果存到Map中,value就是最终拿到的数据。
promiseCache.getInfo().then(value=>console.log(value)) //此时会读取Map中的缓存