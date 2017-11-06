/* eslint-disable */

// demo5: 方法的修饰 修饰器不仅可以修饰类，还可以修饰类的属性。

class Demo5 {

  children = [1,2,3,4,5];

  // 构造函数
  constructor(name) {
    this.fullName = name || 'sunxiaotao';
  }

  // class 类的属性的修饰器: 不可枚举
  @nonenumerable
  get kidCount() {
    console.log('decorator: 不可枚举属性')
    return this.children.length;
  }

  @enumer
  get address() {
    return '北京海淀区'
  }

  // 可以修改的方法
  sayHi() {
    console.log('hi, demo5');
    return '原来的 sayHi'
  }
}

function readonly(target, name, descriptor) {
  // descriptor对象原来的值如下
  //  {
  //    value: specifiedFunction,
  //    enumerable: false,
  //    configurable: true,
  //    writable: true
  //  }; 利用 writable 属性
  descriptor.writable = false;
  return descriptor;
}

function nonenumerable(target, name, descriptor) {
  // 修改属性描述对象的enumerable属性，使得该属性不可遍历
  descriptor.enumerable = false;  // enumerable 默认不可枚举，不过，对象赋值形式添加属性时，为true, 如： demo5.title = 'eee'
  return descriptor;
}

function enumer(target, name, descriptor) {
  descriptor.enumerable = true;
  return descriptor;
}

// readonly(Person.prototype, 'name', descriptor); // 类似于
// Object.defineProperty(Person.prototype, 'name', descriptor);

export default Demo5;
