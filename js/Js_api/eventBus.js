/* 
  eventBus就是典型的发布订阅模式，添加事件就是订阅，调用就是发布
*/
class EventBus {
  constructor() {
    // 被订阅的事件，Map的值可以是数组
    this.events = this.events || new Map();
    this.maxEventsLength = this.maxEventsLength || 20;
  }
  addEventsListener(type, fn) {
    let handle = this.events.get(type);
    //如果未获取到，那就新set进去
    if (!handle) {
      this.events.set(type, fn);
    } else if (handle && typeof handle === 'function') {
      //如果是函数那就说明value是一个，再次add进来时直接变为数组
      this.events.set(type, [handle, fn]);
    } else {
      //value已经是数组了
      handle.push(fn);
    }
  }
  emit(type, args) {
    let handle = this.events.get(type);
    if (handle && typeof handle === 'function') {
      if (args.length > 0) {
        handle.apply(this, args);
      } else {
        handle.call(this);
      }
    }
    if (Array.isArray(handle)) {
      for (let i = 0; i < handle.length; i++) {
        handle[i].apply(this,args);
      }
    }
  }
  removeEventsListener(type, fn) {
    let handle = this.events.get(type);
    if (handle && typeof handle === 'function') {
      this.events.delete(type);
    } else if (Array.isArray(handle)) {
      let position = handle.indexOf(fn);
      if (position !== -1) {
        handle.splice(fn, 1);
        if (handle.length === 1) {
          this.events.set(type, handle[0]);
        }
      }
    }
  }
}
