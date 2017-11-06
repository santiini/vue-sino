/* eslint-disable */

// demo10: mixins的升级版 -- Trait
// 第三方库: traits-decorator
//   这个模块提供的traits修饰器，不仅可以接受对象，还可以接受 ES6 类作为参数。
//   更多功能： 比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等。
import { traits, excludes, alias, requires } from 'traits-decorator'

class Demo1 {
  sayHi() {
    console.log('Hi, demo1111');
  }
}

class Demo2 {
  sayHi() {
    console.log('Hi, demo222');
  }
  printTime() {
    console.log(new Date());
    console.log(Date.now());
  }
}

// tips: Trait 不允许“混入”同名方法。
// 两种解决办法:

// 1. 一种解决方法是排除 Demo2 的 sayHi 方法
@traits(Demo1, Demo2::excludes('sayHi'))
class MyClass1 {
  // 上面代码使用绑定运算符（::）在TBar上排除foo方法，混入时就不会报错了。
  sayNme() {
    console.log('this name is MyClass1')
  }
}

// 2. 为 Demo2 的 sayHi 方法起一个别名 alias
@traits(Demo1, Demo2::alias({ sayHi: 'sayHi2' }))
class MyClass2 {
  sayName() {
    console.log('this name is MyClass2')
  }
}

// tips: traits 和 绑定运算符（::） 的运行环境配置:
// 1. npm install --save-dev babel-preset-stage-0
// 2. "presets": ["stage-0"]

// tips: Decorator 语法的支持环境配置:
// 1. 安装babel-core和babel-plugin-transform-decorators, 后者包括在babel-preset-stage-0之中
    // npm install babel-core babel-plugin-transform-decorators
// 2. "plugins": ["transform-decorators"]

export {
  MyClass1,
  MyClass2
}
