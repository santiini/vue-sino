/**
 * eventhelper -- 一个基于事件机制的异步事件处理工具
 * 参考：https://github.com/yvanwangl/EventHelper
 * demo: https://juejin.im/post/59ddc6cbf265da430b7a37e6
 */
/* eslint-disable dd */
// import EventHelper from 'eventhelper';

// // const fs = require('fs')

// const emmiter = new EventHelper();

// // 事件绑定的初始化
// const emmiterInit = () => {
//   //  on(eventType:String, handler:Function), 事件监听 搭配emit方法使用才有效果
//   emmiter.on('read', (content) => {
//     console.log(content)
//   })
// }

// // demo1:  emit(type, data), 触发事件，传参
// const eventEmit = (type, data) => {
//   emmiter.emit(type, data)
// }

// export {
//   emmiter,
//   emmiterInit,
//   eventEmit,
// }

import EventEmmiter from 'eventhelper';

import EventHelper from './lib';

export {
  EventEmmiter,
  EventHelper,
}
