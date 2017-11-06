/* eslint-disable */

// demo2: decorator 的简单测试 - 类的修饰2

// 类的修饰器
// decorator 传入参数
@testable(28, '洛阳涧西区', 18500102459)
class Demo2Class {
  name = 'demo2';

  static title = 'Static Demo2';

  sayHi() {
    console.log('hi demo2');
  }
}


// decorator 的实质是 函数
// decorator的两种类型：
// 1. class 类的修饰器 decorator
  // 此时，decorato 函数的 参数只有一个： target 指向 class 类本身;
function testable1(target) {
  target.testName = 'decorator test name';
}

// 如果觉得一个参数不够用，可以在修饰器外面再封装一层函数。
  // 返回 decorator 函数
function testable(age, address, telphone) {
  return function(target) {
    // tip1: target 指向 class 自身， 所以这些都是 class 的静态属性
    target.age = age
    target.address = address
    target.telphone = telphone

    // tips: 如果想要修饰实例属性，可以通过 target.prototype 直接修饰 class 类的原型 prototype
    // info 是 class 类的实例属性
    target.prototype.info = `age: ${age},address:${address},telphone:${telphone}`
  }
}

export default Demo2Class;
