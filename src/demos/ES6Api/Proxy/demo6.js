/* eslint-disable */

// has(target, propKey)：拦截propKey in proxy的操作，返回一个布尔值。

// has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。典型的操作就是in运算符。

// demo1: 下面的例子使用has方法隐藏某些属性，不被in运算符发现。

const Inhandler = {
  has (target, key) {
    if (key[0] === '_') {
      return false;
    }
    return key in target;
  },
};
const privateProp = {
  _name: '卑微的我',
  name: '高傲的我',
  age: 20,
  _age: 28,
};
const privateProxy = new Proxy(privateProp, Inhandler);
// 1. 值得注意的是，has方法拦截的是HasProperty操作，而不是HasOwnProperty操作，即has方法不判断一个属性是对象自身的属性，还是继承的属性。
// 虽然for...in循环也用到了in运算符，但是has拦截对for...in循环不生效。

export {
  privateProxy,
}
