## 生成器是一类特殊的函数，他可以一次或多次启动或者停止，也可以不将函数执行完。
## 生成器函数在执行完后会变成一个迭代器。也就是在GeneratorPrototype（生成器函数原型上）扩展了一个return this()的Symbol.iterator函数，这样执行foo()后就可以对它进行迭代
## function *foo(){},这个就是生成器函数，可以在function后面直接加*，也可以在函数名前加*
## function *foo(x){
    x++;
    yield;
    console.log(x);
}
##  yield可以将函数暂停，等执行完上一步x++后再继续执行
##  也可以 let f = foo(1); f.next(); 执行next()才会启动函数开始执行.f就是叫Generator的迭代器，当执行一个生成器，就得到了一个迭代器。每次都不一样，每个Generator只能执行一次

## Promise + 生成器（Generator迭代器）---> async/await语法糖
