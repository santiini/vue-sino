/**
 * 测试class
 */
/* eslint-disable */
import store from '../../store';

export class DemoClass {

  // 测试静态属性，当其值为引用类型时，是否会动态变化;
  static get headerName() {
    return store.state.header.title;
  }

  static isOdd() {
    console.log(this.headerName)
    return this.headerName.length % 2 === 0
  }

  getApi() {
    return Promise.resolve({ msg: '测试' })
  }
}

// export default function () {
//   if (!instance) {
//     const instance = new DemoClass();
//   }
//   return
// }

export default new DemoClass()
