//三种状态，初始为pending，只能从pending转为fulfilled或rejected并且状态不可逆转
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
class MyPromise {
  constructor(executor) {
    //状态
    this.state = PENDING;
    //成功传入的值
    this.value = null;
    //失败传入的原因
    this.error = null;
    //成功、失败的回调函数数组，因为会有多个then，所以数组存放回调函数，执行resolve或reject时循环执行就行
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    const resolve = (value) => {
      //如果resolve传入的值还是promise那么就会返回这个新promise.then完成链式调用
      if (value instanceof MyPromise) {
        return value.then(resolve, reject);
      }
      //下面就是执行resolve中该执行的，改变状态、改变值，调用回调等
      if (this.state === PENDING) {
        setTimeout(() => {
          this.value = value;
          this.state = FULFILLED;
          this.onFulfilledCallbacks.map((fn) => fn(this.value));
        }, 0);
      }
    };
    //reject同理
    const reject = (error) => {
      if (this.state === PENDING) {
        setTimeout(() => {
          this.error = error;
          this.state = REJECTED;
          this.onRejectedCallbacks.map((fn) => fn(this.error));
        }, 0);
      }
    };
    try {
      //调用Promise示例传入的回调函数
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }
  //then方法，onFulfilled表示成功执行的函数，onRejected表示失败执行的函数
  //调用resolve是会调用onFulfilled因为在pending状态下已经在onFulfiiledCallbacks数组里push进去的函数体内会执行onFulfilled,reject同理
  then(onFulfilled, onRejected) {
    //判断是不是函数，如果不是直接复制成功的值，失败抛出失败的原因
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (error) => {
            throw error;
          };
    //要返回的新的promise
    let promise2;
    return (promise2 = new MyPromise((resolve, reject) => {
      //onFulfilled()或者onRejected()得到值x就是第一个then返回的值，判断x的函数就是下面的resolvePromise
      //如果x是Promise那么直接取x的结果作为新的promise2的结果，要区分x的状态，pending有pending的执行，其他状态通过x.then作为新的结果
      if (this.state === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
        this.onRejectedCallbacks.push(() => {
          try {
            let x = onRejected(this.error);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        });
      } else if (this.state === FULFILLED) {
        //如果状态已经变成fulfilled那么
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      } else if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.error);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }
    }));
  }
  resolve(param) {
    if (param instanceof MyPromise) return param;
    return new MyPromise((resolve, rejcet) => {
      if (param && param.then && typeof param.then === 'function') {
        param.then(resolve, rejcet);
      } else {
        resolve(param);
      }
    });
  }
  reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
  all(promises) {
    return new MyPromise((resolve, rejcet) => {
      let result = [];
      let index = 0;
      let len = promises.length;
      if (len === 0) {
        resolve(result);
        return;
      } else {
        for (let i = 0; i < len; i++) {
          MyPromise.resolve(promises[i])
            .then((res) => {
              result[i] = res;
              index++;
              if (i === index) resolve(result);
            })
            .catch((err) => {
              reject(err);
            });
        }
      }
    });
  }
  race(promises) {
    return new MyPromise((resolve, reject) => {
      let len = promises.length;
      if (len === 0) return;
      for (let i = 0; i < len; i++) {
        MyPromise.resolve(promises[i])
          .then((res) => {
            resolve(res);
            return;
          })
          .catch((err) => {
            reject(err);
            return;
          });
      }
    });
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  //如果他两相等，则一直是自己等待自己完成，会造成循环引用
  if (x === promise2) {
    reject(new TypeError('循环引用了'));
  }
  //如果x是Promise那么直接取x的结果作为新的promise2的结果，要区分x的状态，pending有pending的执行，其他状态通过x.then作为新的结果
  if (x instanceof MyPromise) {
    if (x.state === PENDING) {
      x.then(
        (onF) => {
          resolvePromise(promise2, onF, resolve, reject);
        },
        (onR) => {
          reject(onR);
        }
      );
    } else {
      x.then(resolve, reject);
    }
  } else if (x && (typeof x === 'function' || typeof x === 'object')) {
    //如果x是函数或者对象,并且x有then方法看上去像是一个Promise，那么就尝试promise接收x的状态
    let called = false;
    try {
      let xthen = x.then;
      if (typeof xthen === 'function') {
        //如果x.then是函数，call来将x的this调用给xthen,如果第一个函数被值onF调用，那么执行resolvePromise，完成链式
        //如果第二个函数被值onR调用，那么已onR为原因拒绝promise
        //为了防止两个函数都被调用，或者一个参数被函数调用了多次，设置called只能调用一次
        xthen.call(
          x,
          (onF) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, onF, resolve, reject);
          },
          (onR) => {
            if (called) return;
            called = true;
            reject(onR);
          }
        );
      } else {
        //xthen不是函数，那么值x执行resolve完成promise
        resolve(x);
      }
    } catch (err) {
      //如果上面的xthen.call()中第一个或者第二个函数已经执行过了，直接return，否则已err为原因拒绝promise
      if (called) return;
      called = true;
      reject(err);
    }
  } else {
    //如果就是普通值直接执行就好了
    resolve(x);
  }
}

MyPromise.deferred = function () {
  let defer = {};
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  let a = new MyPromise((resolve, reject) => {
    resolve(1);
  });
  let b = new MyPromise((resolve, reject) => {
    resolve(2);
  });

  defer.promise.all(a, b);
  return defer;
};

module.exports = MyPromise;

//promises-aplus-tests MyPromise.js
