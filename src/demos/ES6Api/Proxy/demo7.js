/* eslint-disable */

// construct(target, args)：拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
// construct方法用于拦截new命令，下面是拦截对象的写法。
// 2个参数:
//  1. target: 目标对象
//  2. args：构建函数的参数对象
//  3. construct方法返回的必须是一个对象，否则会报错。
var handler = {
  construct (target, args, newTarget) {
    return new target(...args);
  }
};

// demo1:
const func1 = () => {
  console.log('target function')
};
const funcProxy = new Proxy(func1, {
  construct(target, args) {
    console.log('proxy function');
    // 必须返回一个对象
    return { value: args[0], target };
  },
});


// deleteProperty(target, propKey)：拦截delete proxy[propKey]的操作，返回一个布尔值
// 如果这个方法抛出错误或者返回false，当前属性就无法被delete命令删除。

// demo1:
const invalidDelete = (key, action) => {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" proprerty`);
  }
};
const deleteHandler = {
  deleteProperty (target, key) {
    // invalidDelete(key, 'delete');
    console.log(`删除属性：${key}`);
    // return true;
    return Reflect.deleteProperty(...arguments)
  }
};
const deleteObj = {
  name: '小白',
  _name: '孙小涛',
  age: 23,
  _age: 28,
};
const delProxy = new Proxy(deleteObj, deleteHandler);
const deleteFunc = () => {
  console.log(delProxy.name);
  delete delProxy.name;
  delete delProxy.age;
  console.log(delProxy);
  console.log(deleteObj)

  // console.log(`删除deleteObj`)
  // delete deleteObj.name
  // delete deleteObj.age
  // console.log(deleteObj)
};


// defineProperty(target, propKey, propDesc)：
// 拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值
// demo2:
const defineHandler = {
  defineProperty(target, key, descriptor) {
    // return true;
    // return false;
    // tips: proxy 和 Reflect 上的方法一一对应;
    return Reflect.defineProperty(...arguments);
  }
}
const defineFunc = () => {
  const target = {};
  const proxy = new Proxy(target, defineHandler);
  proxy.name = '小白';
  console.log(proxy);
  console.log(target);
};


// getPrototypeOf(target)：
// getPrototypeOf方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
// 1. Object.prototype.__proto__
// 2. Object.prototype.isPrototypeOf()
// 3. Object.getPrototypeOf()
// 4. Reflect.getPrototypeOf()
// 5. instanceof

// demo3
const getProtoFunc = () => {
  const proto = { type: 'Dell', price: 54000 };
  const proxy = new Proxy(proto, {
    getPrototypeOf(target) {
      return proto;
    },
  });

  console.log(Object.getPrototypeOf(proxy) === proto)
};


// isExtensible(target)：拦截Object.isExtensible(proxy)，返回一个布尔值。
// 拦截Object.isExtensible - 对象是否可扩展的 操作。

// demo4
const isExtensibleFunc = () => {
  const target = { name: 'Santiiny' };
  const proxy = new Proxy(target, {
    isExtensible(target) {
      console.log(`called isExtensible`)
      return true;
      // return false;
    },
  });

  console.log(Object.isExtensible(proxy));
};


// ownKeys(target)：拦截对象自身属性的读取操作
// 拦截以下操作：
//   1. Object.getOwnPropertyNames(proxy)、
//   2. Object.getOwnPropertySymbols(proxy)、
//   3. Object.keys(proxy)，
// 返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性

// demo5.1: 拦截Object.keys()的例子。
const keysFunc1 = () => {
  const target = {
    foo: 1,
    bar: 2,
  };
  const keysHandler = {
    ownKeys(target) {
      // 返回一个包含属性名称的数组;
      return ['foo']
    },
  };
  const proxy = new Proxy(target, keysHandler)
  console.log(Object.keys(proxy))
};
// 注意，使用Object.keys方法时，有三类属性会被ownKeys方法自动过滤，不会返回。
// 1. 目标对象上不存在的属性
// 2. 目标对象上不存在的属性
// 3. 不可遍历（enumerable）的属性
const keysFunc2 = () => {
  const target = {
    a: 1, b: 2, c: 3,
    [Symbol.for('test')]: '4',
  };
  Object.defineProperty(target, 'key', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: 'static',
  });
  let handler = {
    ownKeys(target) {
      // ownKeys方法之中，显式返回不存在的属性（d）、Symbol 值（Symbol.for('secret')）、不可遍历的属性（key），结果都被自动过滤掉。
      return ['a', 'd', Symbol.for('secret'), 'key'];
    }
  };
  const proxy = new Proxy(target, handler);
  console.log(Object.keys(proxy));
};


// Proxy.revocable方法返回一个可取消的 Proxy 实例。
// Proxy.revocable的一个使用场景是，目标对象不允许直接访问，必须通过代理访问，一旦访问结束，就收回代理权，不允许再次访问。
const revokeProxy = () => {
  const target = { name: 'santiiny', age: 18 };
  const handler = {
    get(target, prop, receiver) {
      if (prop === 'age') {
        return 28
      }
      return Reflect.get(...arguments);
    }
  };
  // const proxy = new Proxy(target, handler)
  const { proxy, revoke } = Proxy.revocable(target, handler);
  console.log(proxy.name)
  console.log(proxy.age)
  // 撤销 proxy
  revoke(); // revoke属性是一个函数，可以取消Proxy实例
  console.log(proxy.age)
  console.log(proxy.name)
};

export {
  funcProxy,
  delProxy,
  deleteFunc,
  defineFunc,
  getProtoFunc,
  isExtensibleFunc,
  keysFunc1,
  keysFunc2,
  revokeProxy,
}
