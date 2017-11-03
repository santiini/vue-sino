/* eslint-disable */

// demo6: 方法的修饰 修饰器不仅可以修饰类，还可以修饰类的属性。
// 打印日志 log

class Demo6 {
  @log
  add (a, b) {
    return a + b;
  }

  @print
  square(num, plus) {
    return num * num + plus;
  }
}

function log(target, name, descriptor) {
  const oldVal = descriptor.value;

  descriptor.value = function() {
    // es5 方式: arguments, 信息量更多
    // 打印参数信息
    console.log(`log: ${name} with`, arguments);
    // 把参数信息， 用 apply 执行
    return oldVal.apply(null, arguments);
  };

  return descriptor;
}

function print(target, name, descriptor) {
  const oldVal = descriptor.value;

  descriptor.value = function(...params) {
    // es6方式：更加简洁
    console.log(`print: ${name}`, ...params)

    // call: 多个参数的形式
    // return oldVal.call(null, ...params);
    // apply: 数组形式
    return oldVal.apply(null, params);
  };

  return descriptor;
}

export default Demo6;
