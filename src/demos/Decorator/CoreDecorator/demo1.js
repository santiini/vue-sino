/* eslint-disable */
import { autobind, readonly, override, deprecate } from 'core-decorators';


// demo1: autobind
class Person {
  // autobind修饰器使得方法中的this对象，绑定原始对象。
  @autobind
  getPerson() {
    return this;
  }

  // demo4: @deprecate
  // deprecate或deprecated修饰器在控制台显示一条警告，表示该方法将废除
  @deprecate
  disCardedMethod1() {
    console.log('this is a discarded method')
  }
  @deprecate('this method has descarded')
  disCardedMethod2() {
    console.log('this is a discarded method')
  }
  @deprecate('this method has descarded', { url: 'http://www.baidu.com'})
  disCardedMethod3() {
    console.log('this is a discarded method')
  }
}

// demo2: readonly
class Meal {
  @readonly
  title = 'readonly title';

  name = 'free name';
}

// demo3: override
class Parent {
  speak(first, second) {
    console.log(`old speak: ${first}, ${second}`);
  }
}

class Child1 extends Parent {
  @override
  speak(first, second) {
    console.log(`new speak: ${first}`);
  }
}

class Child2 extends Parent {
  // 这里， 会报错： No descriptor matching Child2#speaks() was found on the prototype chain.
  @override
  speak(first, second) { // 正确的
  // speak() { // 会报错, 没有正确的参数传入
  // speaks() { // 会报错
    console.log(`error speak`);
  }
}

export {
  Person,
  Meal,
  Child1, Child2,
}

