function Foo(name) {
    this.name = name;
}
Foo.prototype.myName = function () {
    return this.name;
};
function Boo(name, age) {
    Foo.call(this, name);
    this.age = age;
}
function NullFunc() {}
NullFunc.prototype = Foo.prototype;
Boo.prototype = new NullFunc();
Boo.prototype.myInfo = function () {
    console.log(`my name is ${this.name},my age ${this.age}`);
};
var boo = new Boo("mt", 18);
boo.myInfo();
