/* eslint-disable */

// demo1: decorator 的简单测试 -- 类的修饰1

// 类的修饰器
@testable
class Demo1Class {
  name = 'demo1';

  static title = 'Static Demo1';

  sayHi() {
    console.log('hi');
  }
}


// decorator 的实质是 函数
// decorator的两种类型：
// 1. class 类的修饰器 decorator
  // 此时，decorato 函数的 参数只有一个： target 指向 class 类本身;
function testable(target) {
  // 属性
  target.testName = 'decorator test name';

  // 方法
  target.doubleNumber = function(num = 10) {
    console.log(`double num: ${num * 2}`);
  }
}

export default Demo1Class;
