function Foo(name) {
    this.name = name;
}
Foo.prototype.myName = function () {
    return this.name;
};
function Boo(name, label) {
    Foo.call(this, name);
    this.label = label;
}
// var NullFunc = function(){};
// NullFunc.prototype = Foo.prototype;
// Boo.prototype = new NullFunc();
Boo.prototype = Object.create(Foo.prototype);
Boo.prototype.myLabel = function () {
    console.log(`myname${this.name}${this.label}`);
};
var boo = new Boo("mt", "18");
boo.myLabel();

//寄生组合继承

// 委托对象写法：

var Foo = {
    fooName:1,
    myName:function myName(){
        return this.fooName
    }
}
var Boo = Object.create(Foo);
Boo.boName = 2;
Boo.myName()