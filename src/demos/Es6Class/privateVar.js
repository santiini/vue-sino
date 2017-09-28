/**
 * es6 的私有属性的模拟
 */
/* eslint-disable */
const events = {}; // 事件
const data = {}; // 数据

export class MyClass {
  // 事件监听
  on(event, handler) {
    if (!events[event]) {
      events[event] = [];
    }
    events[event.push(handler)];
  }

  // 事件触发
  trigger(event, params = []) {
    let evts = events[event]
    if (evts instanceof Array) {
      // 遍历执行回调
      evts.forEach(callback => {
        if (typeof callback === 'function') {
          if (Array.isArray(params)) {
            callback.apply(this, params);
          } else {
            callback.call(this, params)
          }
        }
      })
    }
  }

  // 数据管理--私有数据
  get(key) {
    return data[this] && data[this][key]
  }

  set(key, value, notify = true) {
    if (!data[this]) {
      data[this] = {}
    }
    data[this][key] = value
    if (notify) {
      this.trigger('change' + key, value)
    }
  }

  call(factory, ...args) {
    factory.applay(this, args);
  }

}
