/* eslint-disable */

// demo7: 多个 decorator 修饰器一起使用

class Demo7 {

  @dec(1)
  @dec(2)
  @dec(3)
  sayHi() {
    console.log('sayHi: 方法');
  }
}

// decorator 函数
function dec(id) {
  // console.log(`外层：${id}`);
    return (target, name, descriptor) => {
      // console.log(`内层：${id}`);
    }
}

// tips:
// 外层修饰器@dec(1)先进入，但是内层修饰器@dec(2)先执行。


export default Demo7;
