## myObj.foo = 'aa'
## 1、如果myObj中存在foo属性，那么就直接给foo重新赋值(区分这个属性的操作符，可写就重新赋值，只读就静默失败，有setter直接调用setter)。
## 2、如果myObj中不存在foo属性，那么会通过原型链向上查找，如果原型链上没有，那么就给myObj添加foo属性并赋值
## 3、如果myObj中不存在foo属性，通过向上查找原型链发现原型链中有foo属性。那么会出现以下三种情况：
## 3.1、原型链上的foo是一个普通的数据描述符，并且该描述符的writable为true，那么就会在myObj上创建foo属性。这样一来myObj上的foo属性就发生了屏蔽。因为下一次重新赋值或者读值时，myObj内可以直接查找到foo属性，而不会向上查找原型链中的foo属性。
## 3.2、原型链上的foo是一个普通的数据描述符，但是该描述符的writable为false，那么myObj.foo = 'aa'这句代码会被忽略。因为原型链的foo是只读的。
## 3.3、原型链上的foo是一个存储描述符（访问描述符），并且是一个setter，那么会调用这个setter，并且不会将foo添加到myObj，也不会修改foo的setter。

例如：
    var fatherObj = {
        a:2
    }
    var childObj = Object.creat(fatherObj);
    fatherObj.a //2
    childObj.a //2
    fatherObj.hasOwnProperty('a') //true;
    childObj.hasOwnProperrty('a') //fasle;
    childObj.a++;
    // childObj.a++相当于childObj.a = childObj.a + 1,这样会触发原型链查找，并且原型链上的a属性（也就是fatherObj的a）的writable是true并且childObj.a等于2，
    // 下一步是childObj.a = 3，所以就会给childObj添加a属性并赋值
    fatherObj.a //2
    childObj.a //3;
    childObj.hasOwnProperrty('a') //true;

## 原型
    function Foo(){...};//Foo是构造函数（默认首字母大写）
    Foo.prototype; //{} 这个对象就是Foo的原型
    var a = new Foo();时
## 1、创建一个新的对象
## 2、这个新对象会被链接到Foo.prototype上，也就是跟构造函数的原型链接。
## 3、将this指向构造函数
## 4、如果构造函数Foo没有返回对象，那么就把新创建的对象赋值给a变量。
## 整个过程只是把一个新的对象和Foo进行关联，并没有初始化一个类，没有从任何一个类中复制任何东西到一个新对象上，只是两个对象的关联（Foo构造函数本身就是对象，函数就是对象）。并且new Foo()也不是直接创建了关联（上面的四步），而是间接的将构造函数Foo和新对象关联了。

## 只有函数，只有当函数被new调用时才会变成构造函数

例：
    var Foo = function(){
        this.name = 1;
    }
    Foo.prototype.myName = function(){
        return this.name
    }
    var a = new Foo();
    a.myName() //输出1
    a.name() //输出1
    a.hasOwnPrototype('name') // true
    a.hasOwnPrototype('myName') // false
## 如上例，new Foo()赋值给a后，a对象中有name属性，这是因为在执行new时，a对象的this指向会被指向构造函数Foo内部，name就被放在了对象a中，但是为什么myName不存在与对象a中呢？因为myName是构造函数Foo原型上的方法，被定义在了Foo.prototype上，执行new时，会把对象a的__proto__和构造函数Foo的prototype链接起来，这样即使对象a上不存在myName属性，但是在调用时，会触发[[Get]]操作，会沿着对象a关联的原型链向上查找，最终在Foo.prototype上查找到了。

例：
    var Foo = function(name){
        this.name = name;
    }
    Foo.prototype.myName = function(){
        return this.name
    }
    var Boo = function(name,label){
        Foo.call(this,name);
        this.label = label
    }
    Boo.prototype = Object.create(Foo.prototype);
    Boo.prototype.myLabel = function(){
        return this.label
    }
    var a = new Boo('a','label a');
    a.myLabel();//label a
    a.myName();//a
## 如上例，第一个构造函数Foo，定义了name属性，在Foo的原型上定义了myName方法，返回name属性，第二个构造函数Boo，定义了label属性，并且将构造函数Foo的this指向了Boo内，这样Boo也可以访问到name属性，然后Object.create(Foo.prototype)会创建一个空对象并且把空对象的__proto__指向Foo.prototype，等于是创建了一个新的Boo.prototype对象并且把它和Foo.prototype关联起来（旧的原型对象Boo.prototype抛弃掉），这样形成了一个从上（Foo的原型）到下（Boo的原型）原型链。a.myLabel()时会去Boo的原型上找，找到了。a.myName()，对象a本身没有myName这个属性，[[Get]]操作向上查找，第一步找到Boo的原型上发现也没有，沿着原型链继续向上找，找到了Foo的原型，找到了。

## 如果使用Boo.prototype = Foo.prototype,只是将Boo的原型引用了Foo的原型，这样在使用Boo.prototype.myLabel...时也会修改Foo.prototype

## 如果使用Boo.prototype = new Foo();这样会导致new Foo()创建的新对象与Boo.prototype关联，但是new Foo()的构造函数调用如果Foo构造函数中有一些副作用，Boo也会有，这样new Boo()时也会影响下一个对象。

## es6中的，Object.setPrototypeOf(Boo.prototype,Foo.prototype)也是可以的

## b.isPrototypeOf(a) 判断对象b是否出现在对象a的原型链中 a.__proto === b.__proto__ === B.prototype
## Object.getPrototypeOf(a) 
## __proto__更像是一个定义在Object.prototype上的setter/getter

Object.defineProperty(Object.prototype,'__proto__',{
    get:function(){
        return Object.getPrototypeOf(this)
    },
    set:function(o){
        Object.setPrototypeOf(this,o)
        return o
    }
})

## Object.create():
if(!Object.create){
    Object.create = function(o){
        var NullF = function(){};
        NullF.prototype = o;
        return new NullF;
    }
}

## 委托机制。委托机制并不是像类那般有着父子继承机制，委托是对象之间的一种关联，更像是兄弟关系。js的原型链本质上就是委托机制。原型对象之间相互关联，共享方法等。
## 通过Object.create()来进行委托，Object.create(obj,{})，第二个参数可以传入需要添加到新对象中的属性名，以及这些属性的描述符。
<script>
    var objA = {
        a: 1
    }
    var objB = Object.create(objA , {
        b: {
            configurable: false,
            writable: true,
            enumerable: false,
            value: 2
        }
    })
    objB.a // 1
    objB.b // 2
    objB.hasOwnProperty(a) //false
    objB.hasOwnProperty(b) //true

    // 这个就是对象直接的委托。
</script>