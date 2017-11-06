/* eslint-disable */

// demo9: 实现 mixin

// class 类的装饰器 decorator -- mixin
function mixins(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list);
  }
}


// 使用上面这个修饰器，为类 class “混入”各种方法。

const mixinObj = {
  name: 'sun',
  age: 28,
  testMethod1() {
    console.log('mixin method testMethod1')
  },
  testMethod2() {
    console.log('mixin method testMethod2')
  },
  testMethod3() {
    console.log('mixin method testMethod3')
  },
};

@mixins(mixinObj)
class Demo9 {
  title = 'demo9';

  sayHi() {
    console.log('hi, this is demo9')
  }
}

// tips: 不过，上面的方法会改写MyClass类的prototype对象，如果不喜欢这一点，也可以通过类的继承实现 Mixin。

// 基础类
class BaseClass {
  title = 'base class';

  sayHi() {
    console.log('this is base class');
  }
}

/**
 * 混入类 class
 * 在 MyClass 和 BaseClass 之间插入一个混入类，这个类具有foo方法等要混入的属性，方法
 * 混入类继承了 BaseClass 的所有方法, MyClass 再继承这个混入类
 * MyMixin是一个混入类生成器，接受superclass作为参数，然后返回一个继承superclass的子类，该子类包含一个foo方法。
 */
const MyMixin = (superClass) => class extends superClass {
  // 要混入的方法和属性
  // 属性
  firstName = 'sun';
  lastName = 'xiaot';
  // 方法
  printTime() {
    console.log(Date.now());
  }
  toMixin() {
    console.log('this is mixin method');
  }
};

// 继承类
// 1. 一般性的继承
class MyClass extends BaseClass {
  sayName() {
    console.log('this name is MyClass');
  }
}

// 2. 混入一个类;
class MyClass2 extends MyMixin(BaseClass) {
  name = '孙小涛';
  header = '继承类的title';

  sayName() {
    console.log('继承类的方法: sayName')
  }
}

// 混入多个类;
// 如果需要“混入”多个方法，就生成多个混入类。
// class MyClass extends Mixin1(Mixin2(MyBaseClass)) {

const Mixin1 = (superClass) => class extends superClass {
  // 这种写法的一个好处，是可以调用super，因此可以避免在“混入”过程中覆盖父类的同名方法。
  sayHi() {
    console.log('Hi, mixin1');
    if (super.sayHi) {
      // 调用父类的 sayHi 方法: super.sayHi()
      super.sayHi();
    }
  }
};
const Mixin2 = (superClass) => class extends superClass {
  sayHi() {
    console.log('Hi, mixin2');
    if (super.sayHi) {
      super.sayHi();
    }
  }
};

class TestClass {
  sayHi() {
    console.log('Hi, testClass');
  }
}

// 每一次混入发生时，都调用了父类的super.foo方法，导致父类的同名方法没有被覆盖，行为被保留了下来。
// 利用继承的原型链，分别调用了原型链上的 sayHi 方法
class MyClass3 extends Mixin1(Mixin2(TestClass)) {
  sayHi() {
    console.log('Hi, myClass3');
    super.sayHi();
  }
}


export default Demo9;

export {
  MyClass2,
  MyClass3,
}
