//红绿灯问题。红灯3S亮一次，绿灯2S亮一次，黄灯1S一次
import MyPromise from './MyPromise';
function red() {
  console.log('红灯亮');
}
function green() {
  console.log('绿灯亮');
}
function yellow() {
  console.log('黄灯亮');
}
function light(wait, cb) {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      cb();
      resolve();
    }, wait);
  });
}
function start() {
  new MyPromise().resolve()
    .then(() => {
      return light(3000, red);
    })
    .then(() => {
      return light(2000, green);
    })
    .then(() => {
      return light(1000, yellow);
    })
    .then(() => {
      start();
    });
}
start();
