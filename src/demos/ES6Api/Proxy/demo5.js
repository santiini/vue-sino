/* eslint-disable */

// apply(target, object, args)：拦截函数
// 拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
// 3个参数：
//   1. 目标对象
//   2. 目标对象的上下文
//   3  目标对象的参数数组

// demo1: 变量p是 Proxy 的实例，当它作为函数调用时（p()），就会被apply方法拦截，返回一个字符串。
const getStr = () => 'I am target';
const getStrHanlder = {
  apply: function () {
    return 'I am the proxy';
  },
};
const getStrProxy = new Proxy(getStr, getStrHanlder);

// demo2: 每当执行proxy函数（直接调用或call和apply调用），就会被apply方法拦截。
// 另外，直接调用Reflect.apply方法，也会被拦截。
const twiceHandler = {
  apply (target, ctx, args) {
    // console.log(target);
    // console.log(ctx);
    // console.log(args);

    console.log(args)
    console.log(...arguments)
    // apply 的三个参数，对应到 Reflect.call 中
    // 下面两种方法是一致的:
    return Reflect.apply(...arguments) * 2;
    // return Reflect.apply(target, ctx, args) * 2;
  },
};
function sum (left, right) {
  return left + right;
}
const twice = new Proxy(sum, twiceHandler);

export {
  getStrProxy,
  getStr,
  twice,
}
