/* eslint-disable */

// demo3:  decorator - 类的修饰3
// 类似 mixins 的功能


// mixins.js
function mixins(...list) {
  return function(target) {
    // Object.assign() 把 list 的参数的属性值 添加到 taret.prototype 实例属性上;
    Object.assign(target.prototype, ...list);
  }
}


// main.js
const testFuncs = {
  age: 28,
  hope: 'wonderful lift',
  test1() {
    console.log('decorator test 111')
  },
  test2() {
    console.log('decorator test 222')
  },
  test3() {
    console.log('decorator test 333')
  },
  test3(word) {
    console.log(`decorator say: ${word}`)
  },
};


// 类的修饰器
@mixins(testFuncs)
class Demo3Class {
  name = 'demo3';

  sayHi() {
    console.log('hi demo3')
  }
}

export default Demo3Class;

