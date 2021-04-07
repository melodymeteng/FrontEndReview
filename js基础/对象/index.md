## String,Number,Date,RegExp,Function,Array,Object,Error,Boolean 内置对象

## 对象的不变性
## 1、对象常量，通过Object.defineProperty(obj,'obj的key',{configurable:false,writable:false})即可，设置不可写不可配置不可删除。
## 2、禁止扩展，通过Object.preventExtension(obj)就可以设置对象不可新添新的属性
## 3、密封，通过Object.seal(obj),这是Object.preventExtension加上设置configurable:false，让对象变得不可以扩展，同时也不可以删除和配置。
## 4、冻结，通过Object.freeze(obj)，这是Object.seal加上设置writable:false，让对象变得不可扩展，同时也不可配置、删除、修改值。

## 属性描述符。可以通过Object.defineProperty来修改
## 数据描述符。可以通过Object.getOwnPropertyDescriptor来获取。有四个属性：1.value：值。2、enumerable：true/false是否可枚举。3、writable：是否可写
## 4、configurable:是否可配置或删除属性。Object.getOwnPropertyDescriptor(obj,'对象的key')

## 读取对象上的属性值时，会调用[[Get]]算法来查找对象上被查找key的值，如果当前对象上没有，那么会顺着原型链继续向上查找[[Prototype]],如果找不到则返回undefined。
## 在调用[[Put]]时，如果对象上已经存在这个属性，第一步会查看属性是否是存储描述符（访问描述符），如果是那么就调用setter，如果不是那就是数据描述符，接着看writable是否为false，如果true那么就改写值，如果false就静默失败。如果这个属性不存在，那么会在原型链上添加这个属性。

## 存储描述符（访问描述符）。也可以通过Object.defineProperty来修改
## 1、setter：设置属性值。2、getter：获取属性值。
var obj = {
    get a(){ //设置getter
        return this._a
    }
    set a(val){ //设置setter
        this._a = val*2
    }
}

## 检查属性存在性
obj = {a:1}
## in方法。a in obj 返回true，用来检查属性是否在对象上。注意是属性！！。但是如果该对象没有这个属性，那么in方法会继续向上查找原型链上是否有该属性。
## obj.hasOwnProperty(a) 返回true，也是用来检查属性是否在对象上。

## 枚举
## 可以设置enumerable来控制属性是否可枚举。也可以通过Object.propertyIsEnumerable('obj的key')来判断属性是否可枚举：
## 1、Object.entries(obj)会返回对象上的键值对用二维数组的形式展示，第一位是key的数组，第二位是value的数组。[[name,age],['zhangsan',12]]。也是不向上查找原型链
## 2、Object.keys(obj) 仅仅返回obj自己的可枚举属性，不包括继承来的，更不包括Symbol属性。也是不向上查找原型链
## 3、Object.getOwnPropertyNames(obj) 返回obj自己的可枚举和不可枚举属性。但是不包括Symbol属性。也是不向上查找原型链
## 4、Object.getOwnPropertySymbols(obj) 返回obj自己的Symol属性
## 5、for...in 可以遍历obj自己的的和继承的可枚举属性，不包含Symbol属性
## 6、Reflect.ownkeys(obj) 返回对象自身的所有属性，不管是否可枚举，也不管是否是Symbol。注意不包括继承的属性。也是不向上查找原型链

## 迭代
## 数组上可以用for、forEach、every、some、map、for...of等来遍历
## forEach会遍历数组上的所有值并忽略掉回调函数的返回值，map则不会忽略回调函数的返回值。every会一直运行到回调函数返回false。some会一直运行到回调函数返回true。for...of会直接返回数组的value
## 那么对象的遍历可以用什么呢？1.for...in（会查找原型链），会查找对象上的key,for(var a in obj){obj[a]}
## 2.for...of本身是没法遍历对象的。因为for...of本质上是去遍历iterator这个内置属性的。Symbol.iterator。而数组内刚好有这个内置属性，所以可以用for..of遍历。

for...of如果要遍历对象，可以设置Symbol.iterator来实现