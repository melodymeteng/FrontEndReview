//三种状态 等待中、执行中、拒绝，初始都是等待状态，pending只能变为fulfilled或rejected，并且状态不可逆
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// class MyPromise1 {
//   constructor(executor) {
//     //成功（resolve）的值
//     this.value = null;
//     //失败（reject）的值
//     this.error = null;
//     //状态status
//     this.status = PENDING;
//     //成功（resolve）的回调数组
//     this.onResolveCallbacks = [];
//     //失败（reject）的回调数组
//     this.onRejectCallbacks = [];
//     const resolve = value => {
//       if (this.status !== PENDING) return;
//       setTimeout(() => {
//         this.status = FULFILLED;
//         this.value = value;
//         //一旦resolve执行，调用成功回调数组的函数
//         this.onResolveCallbacks.forEach(fn => fn());
//       });
//     };
//     const reject = error => {
//       if (this.status !== PENDING) return;
//       setTimeout(() => {
//         this.status = REJECTED;
//         this.error = error;
//         //一旦reject执行，调用失败回调数组的函数
//         this.onRejectCallbacks.forEach(fn => fn());
//       });
//     };
//     try {
//       executor(resolve, reject);
//     } catch (errÎ) {
//       reject(err);
//     }
//   }
//   //then的两个参数onFulfilled成功（有值value），onRejected失败（有失败的原因）
//   then(onFulfilled, onRejected) {
//     if (this.status === PENDING) {
//       //状态pending，将成功状态执行的函数和失败状态执行的函数push到成功/失败数组中
//       this.onResolveCallbacks.push(() => {
//         onFulfilled(this.value);
//       });
//       this.onRejectCallbacks.push(() => {
//         onRejected(this.error);
//       });
//     } else if (this.status === FULFILLED) {
//       //状态变为fulfilled表明此时调用resolve，那么执行onFulfilled并传入成功的值this.value
//       onFulfilled(this.value);
//     } else if (this.status === REJECTED) {
//       //状态变为rejected表明此时调用reject，那么执行onRejected并传入失败的原因this.error
//       onRejected(this.error);
//     }
//   }
// }
class MyPromise {
  constructor(executor) {
    this.value = null;
    this.error = null;
    this.status = PENDING;
    this.onResolveCallbacks = [];
    this.onRejectCallbacks = [];
    const resolve = value => {
      if (this.status !== PENDING) return;
      setTimeout(() => {
        this.status = FULFILLED;
        this.value = value;
        this.onResolveCallbacks.forEach(fn => fn());
      });
    };
    const reject = error => {
      if (this.status !== PENDING) return;
      setTimeout(() => {
        this.status = REJECTED;
        this.error = error;
        this.onRejectCallbacks.forEach(fn => fn());
      });
    };
    try {
      executor(resolve, reject);
    } catch (errÎ) {
      reject(err);
    }
  }
  then(onFulfilled, onRejected) {
    //PromiseA+中规定，调用then默认返回一个新的Promise，这里是promise2
    //将这个promise2的返回值传递到下一个then中
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : error => {
            throw error;
          };
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      } else if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.error);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      } else if (this.status === PENDING) {
        this.onResolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
        this.onRejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.error);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
      }
    });
    //返回这个新的promise
    return promise2;
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  //循环引用报错
  if (x === promise2) {
    return reject(new TypeError('xunhuanyinyong promise'));
  }
  let called;
  if (x !== null && (typeof x == 'object' || typeof x == 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          err => {
            if (called) return;
            called = true;
            resolve(err);
          }
        );
      } else {
        resolve(x);
      }
    } catch (err) {
      if (called) return;
      called = true;
      resolve(err);
    }
  } else {
    resolve(x);
  }
}

MyPromise.deferred = function() {
  let defer = {};
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve;
    defer.reject = reject;
  });
  return defer;
};

module.exports = MyPromise;
