class A {
    constructor() {
        this.a = 1;
    }
    logA() {
        console.log("this.a", this.a);
    }
}

class B extends A {
    // constructor(param) {
    //     super()
    //     this.b = param;
    // }
    logB() {
        // super.logA()
        console.log("this.b", this.b,this.a,this.logB,this.logA);
    }
}

var bb = new B(2)
console.log(bb.hasOwnProperty('logB'))
bb.logB()
