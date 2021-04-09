## 1、let 块级作用域，暂时性死区（声明不提升）、const 定义不可更改的常量（引用类型除外）

## 2、... 展开或收集运算符。let a = [1,2,3] ...a -> 1,2,3 展开。 收集： function(x,...y) function (1,2,3,4,5)---> x=1 y=[2,3,4,5]

## 3、函数默认参数值 function foo(x = 1,y = new Map()) --> foo(2) --> x=2,y=map

## 4、解构赋值。let obj = {a:1,b:2,c:3} let {a,b,c} = obj --> a=1,b=2,c=3

## 5、简洁写法：var a = 1; var obj = {a} --> obj = {a:1}; var o = { x(){} } ---> o = {x:function(){}}

## 6、模板字符串 var a = 1 `cxcccc${a}ss` --> cxcccc1ss

## 7、箭头函数 => 箭头函数的 this 是在创建箭头函数时就被绑定了（指向创建时的作用域、对象），并且this不可以被修改，所以箭头函数无法被 new，并且没有 arguments。

## 8、新增 Symbol 基本类型。符号，不是构造器，不能 new，typeof 会返回 'symbol'，主要用来创建一个类似于字符串但是不会和其他任何值冲突的值。
## Symbol.for(xxx)会在全局注册的 symbol 里找有没有这个值，有就返回没有就创建。Symbol.keyFor(xxx)取值。
## Symbol 当做对象的 key，那么它不会出现在对象的一般枚举中，Object.getOwnPropertySymbol(obj)可以枚举出来。
## ES6 后内置了很多 Symbol.xxx 例如 Symbol.iterator 内置在数组中，让数组可以被 for...of 迭代。本意就是迭代器属性

## 9、迭代器。内置的 iterator。主要是{value:...,done:true/false}，当 done 为 true 时停止迭代。可以通过调用 next()来获取每一次的{value:...,done:...}

## 10、模块

## (1)以前的 CommonJS。使用 exports/moudle.export 导出，require 导入。require 是同步加载，因此 CommonJS 在 node 端使用，前端使用会导致阻塞

## (2)AMD 主要就是为了异步加载模块。也是通过 require 导入，并且依赖前置，提前执行。也就是向 define 方法传入模块时就开始加载并执行

## (3)CMD 也是异步加载模块，主要有 sea.js，而他与 AMD 的区别在于，虽然 CMD 一开始也加载模块，但是只有到使用时才会执行。也就是依赖就近，延迟执行。

## (4)ES6 Moudle。全新的模块导入导出方式。 import 导入 export 导出。导出时可以选择 export 或 export default，后者是做一个默认导出，这样导出后的值，
## 即使修改了模块也不会影响之前导入的结果，export defalut xxx 或者 export {foo as defalut,aoo,boo}，这样 foo 也是默认导出。
## 导入导出时都可以使用 xxx as zzz 这种，xxx 是原先的名称，zzz 是重命名后的。\* as xxx 就是全部重命名到一个新的 xxx 空间。
## ps: Reflect.Loader.import(...)可以动态加载模块，他会返回一个 promise，Reflect.Loader.import(...).then(()=>{})在.then 回调里可以拿到模块数据

## ESMoudle 和 CommonJS 的区别：

## ESMoudle：1.编译时输出（所以不可以放在代码中例如 if 语句里，必须在最上方引入）2.可以引入一部分模块的内容（也可以单独一个）
## 3.引入是值的引用，这样修改模块内容，引入也会受影响

## CommonJS：1.运行时加载 2.加载的是模块的全部内容。3.引入是值的拷贝，可以修改这个值，互不影响

## 11、Map，Set，WeakMap，WeakSet

## （1）Map可以接受任何类型的key，set(key,value)设置值，get(key)获取值，clear()清空整个map，size()获取map的键值对个数，delete(key)删除某个值，values()获取全部值，keys()获取全部key，entries()获取[[全部key],[全部value]]，has(key)是否有这个键

## （2）WeakMap只接受对象来做key，并且WeakMap对于键（也就是对象）是弱引用，也就是说当这个对象一旦被垃圾回收了，那么在WeakMap里的键也会被自动回收。WeakMap没有clear()和size()方法，常用的是set(),get(),has(),delete()

## （3）Set是值的集合（有点像数组），并且Set内的值唯一，重复添加一样的会被忽略。add()添加，has()是否存在，clear()清除Set，size()长度,delete()删除某个值，values()获取全部值,keys()获取全部key，entries()获取[[全部key],[全部value]]。Set默认的迭代器是它的values()。
##  ps:在用Set对数组进行去重时，Set内值的唯一性不允许强制类型转换，1和'1'可以存到Set中不算重复。

## （4）WeakSet，WeakSet的值必须是对象，并且WeakSet对于值是弱引用，如果被当做值的对象被垃圾回收了，那么WeakSet内的值也会被自动回收。

## 12、Array新增的api

## （1）Array.of(...)，Array.of(3)--->[3]不会像var a = [];a[3] = 1--->[empty,empty,empty,1]产生空槽empty

## （2）Array.from(...,()=>{},this)，可以接受一个类数组对象（必须有length属性），将其转换为数组，只会转换类数组对象中以整数做key的键值对，非整数的键会被填充成undefined。第二个回调函数接受当前值，索引两个属性，可以在回调函数中return值来决定新建的数组内容。第三个接受一个this，如果传入了把这个传入的this当做第二个回调函数的this指向，默认是undefined

## （3）Array.fill(value,start,end)，a.fill(6,1,3)就是把a[1]到a[2]都填充成value 6

## （4）Array.find(()=>{},this)，回调函数中return出来的符合条件的数组元素，最终得到要查找元素的值。this用来指定回调函数的this，默认undefined

## （5）Array.findIndex(()=>{},this),与find相似，只不过返回的是要查找元素的索引

## 13、Object新增的api

## （1）Object.keys(),Object.values(),Object.entries(),Object.is(x,y)比较x,y是否===，一般用于识别NaN，-0。Object.getOwnPropertySymbol(),Object.assign(),Object.setPropertyOf(...)设置原型对象（委托）

## 14、Symbol。公开符号
## 定义了很多符号提供专门的元属性，这些元属性可以对JS内的一些东西进行修改。

## （1）Symbol.iterator，可以给对象设置这个符号，这样对象也有了迭代器属性，就可以被for...of迭代

## （2）Symbol.toStringTag和Symbol.hasInstance，foo()调用toString()时，正常会返回'[object Function]'，toStringTag可以给函数foo设置为foo，这样再调用toString()时会返回[object foo]。hasInstance可以设置构造函数在实例化时，传入参数是否符合hasInstance规定的值。设置完hasInstance后，实例 instanceof 构造函数，如果new (...)传入的值与规定的值不同就会返回false。

## （3）Symbol.toPrimitive，定义强制转换.

## 15、代理Proxy和反射Reflect

## Proxy(构造函数)可以创建一个特殊的对象，Proxy(obj,handler)，handler是一个对象也叫代理对象，里面可以定义一些特殊的函数用来执行一些原始对象之外的逻辑。代理对象会挡在原始对象前面，在执行Proxy创建的特殊对象的一些操作时，会先去执行代理对象中的tarp处理函数并且trap会把操作转发给原始对象。

## 比如可以给handler代理对象设置一个get函数(trap)，用来拦截对象访问属性的[[Get]]操作。定义了get(...)trap函数后，函数内可以有对应的Reflect.get(...)来进行反射，也可以不写。Proxy和Reflect总是成对出现的。set(...) & Refelct.set(...)、deleteProperty(...) & Refelct.deleteProperty(...)、ownKeys(...) & Refelct.ownKeys(...)等等。总的来说就是代理trap处理函数进行拦截，Reflect在对象上执行相应的任务。每个代理处理函数都有一个自动调用对应的Relect工具，这是默认定义好的。

<script>
    var obj = {a : 1},
        handler = {
            // target目标对象，也就是Proxy(obj,handler)传入的第一个参数
            // context通过Proxy创建的特殊对象
            // key就是创建对象的key
            get (target, key, context) {
                console.log('key is :', key);
                return Reflect.get(target, key, context);
            }
        },
        proxyObj = new Proxy(obj, handler)
        proxyObj.a // 输出 key is:a然后输出1
</script>

## Proxy.revocable(obj,handler)可以创建一个可以取消的代理。这是一个普通函数，不需要new调用。他会返回一个对象，{proxy,revoke},proxy就是新创建的代理对象，revoke就是取消代理的方法。

## 代理在前。可以提前规定好一些处理，这样在使用Proxy创建后，会先走一些代理内的操作。
## 代理在后。也就是将代理创建的对象通过Object.setPropertyOf()放入新的对象原型上，这样在调用对象方法时，如果对象上本来就有此方法，那么不会受到代理影响，如果没有那么就会走代理的处理函数。这就是先进行对象本身的操作，如果对象本身没有，那么就走挂在对象原型上的代理。



