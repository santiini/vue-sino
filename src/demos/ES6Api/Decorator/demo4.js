/* eslint-disable */

// demo4: 方法的修饰
  // 修饰器不仅可以修饰类，还可以修饰类的属性。

  class Demo4 {

    // 构造函数
    constructor(name, first, last) {
      this.fullName = name || 'sunxiaotao';
      this.first = first || 'sun';
      this.last = last || 'xiaotao';
    }

    // class 类的属性的修饰器
    // 不可修改的方法
    @readonly
    name() {
      console.log('decorator 修饰 class 的方法')
      return `${this.first}${this.last}`
    }

    // 可以修改的方法
    sayHi() {
      console.log('hi, demo4');
      return '原来的 sayHi'
    }
  }

  function readonly(target, name, descriptor) {
      // descriptor对象原来的值如下
      // {
      //   value: specifiedFunction,
      //   enumerable: false,
      //   configurable: true,
      //   writable: true
      // };
      // 利用 writable 属性
      descriptor.writable = false;
      return descriptor;
  }

  // readonly(Person.prototype, 'name', descriptor);
  // // 类似于
  // Object.defineProperty(Person.prototype, 'name', descriptor);

  export default Demo4;
