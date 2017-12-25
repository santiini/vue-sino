/* eslint-disable max-len */
// proxy 的拦截操作, 一共13种

// get(target, propKey, receiver)：
// 拦截对象属性的读取，比如proxy.foo和proxy['foo']。

// set(target, propKey, value, receiver)：
// 拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。

// has(target, propKey)：
// 拦截propKey in proxy的操作，返回一个布尔值。

// deleteProperty(target, propKey)：
// 拦截delete proxy[propKey]的操作，返回一个布尔值。

// ownKeys(target)：
// 拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。
// 该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。

// getOwnPropertyDescriptor(target, propKey)：
// 拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。

// defineProperty(target, propKey, propDesc)：
// 拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。

// preventExtensions(target)：
// 拦截Object.preventExtensions(proxy)，返回一个布尔值。

// getPrototypeOf(target)：
// 拦截Object.getPrototypeOf(proxy)，返回一个对象。

// isExtensible(target)：
// 拦截Object.isExtensible(proxy)，返回一个布尔值。

// setPrototypeOf(target, proto)：
// 拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。

// apply(target, object, args)：
// 拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。

// construct(target, args)：
// 拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。




// 1. get(target, propKey, receiver) : 拦截某个属性的读取操作
// 参数有 3 个： 依次为目标对象、属性名和 proxy 实例本身（即this关键字指向的那个对象），其中最后一个参数可选。

// tips: 如果一个属性不可配置（configurable）和不可写（writable），则该属性不能被代理，通过 Proxy 对象访问该属性会报错
// demo1: 属性代理
const person = {
  name: 'sunxiaotao',
  age: 28,
};

const personProxy = new Proxy(person, {
  get(target, property) {
    if (property in target) {
      return target[property];
    }
    throw new ReferenceError(`Property ${property} does not exist.`)
  },
});

// get 的继承也可以
const personProxy2 = Object.create(personProxy);


// demo2: 使用 get 拦截，实现数组读取负数的索引。
const createArray = (...elements) => {
  const handler = {
    get(target, propKey, receiver) {
      const index = Number(propKey);
      // 如果 array 传入的索引值小于0
      if (index < 0) {
        propKey = String(target.length + index);
      }
      return Reflect.get(target, propKey, receiver);
    },
  };

  const target = [];
  target.push(...elements);
  return new Proxy(target, handler);
};

// demo3: 属性的链式操作
/* eslint-disable */
// const double = n => n * 2;
// const pow = n => n * n;
// const reverseInt = n => n.toString().split('').reverse().join('') | 0;
// 定义一个共调用的函数对象
const tools = {
  double: n => n * 2,
  pow: n => n * n,
  reverseInt: n => n.toString().split('').reverse().join('') || 0,
};
const pipe = (function () {
  return function (value) {
    const funcStack = [];
    const oproxy = new Proxy({}, {
      get(pipeObj, fnName) {
        if (fnName === 'get') {
          // return funcStack.reduce((val, fn) => fn(val), value);
          return funcStack.reduce(function(val, fn){
            return fn(val)
          }, value);
        }
        // 添加
        funcStack.push(tools[fnName]);
        // funcStack.push(window[fnName]);
        return oproxy;
      },
    });

    return oproxy;
  }
}());


const testPipe = n => pipe(n).double.pow.reverseInt.get;

export {
  personProxy,
  personProxy2,
  createArray,
  pipe,
  testPipe,
}

