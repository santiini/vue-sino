/* eslint-disable */
// Reflect 的13个静态方法;
// 上面这些方法的作用，大部分与Object对象的同名方法的作用都是相同的，而且它与Proxy对象的方法是一一对应的。

// dmeo1: Reflect.apply(target, thisArg, args)
// Reflect.get方法查找并返回target对象的name属性，如果没有该属性，则返回undefined。
const demoFunc1 = () => {
  const obj1 = {
    left: 10,
    right: 18,
    get total() {
      return this.left + this.right;
    },
  };
  console.log('简单测试')
  console.log(Reflect.get(obj1, 'left'))
  console.log(Reflect.get(obj1, 'right'))
  console.log(Reflect.get(obj1, 'total'))

  const objReceiver = {
    left: 2,
    right: 10,
  };
  console.log('第三个参数: receiver')
  // 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver。
  console.log(Reflect.get(obj1, 'total', objReceiver));
};

// demo2: Reflect.set(target, name, value, receiver)
// Reflect.set方法设置target对象的name属性等于value。
const demoFunc2 = () => {
  const obj1 = {
    left: 10,
    set total(value) {
      return this.left = value;
    },
  };
  const objReveiver = {
    left: 28,
  };
  Reflect.set(obj1, 'left', 27, objReveiver);
  console.log(obj1.left);
  console.log(objReveiver.left);
};

// demo3: Reflect.has(obj, name)
// Reflect.has方法对应name in obj里面的in运算符。
const demoFunc3 = () => {
  const obj = {
    left: 18,
  };
  const objReceiver = {
    right: 28,
  };
  console.log('left' in obj);
  console.log('right' in obj);
  console.log(Reflect.has(obj, 'left'));
  console.log(Reflect.has(obj, 'right'));
};

// demo4: Reflect.deleteProperty(obj, name)
// Reflect.deleteProperty方法等同于delete obj[name]，用于删除对象的属性。
const demoFunc4 = () => {
  const obj = {
    name: 'santiiny',
    age: 28,
    name1: 'test',
    name2: 'test',
  };
  delete obj.name1
  console.log(obj);
  console.log(Reflect.deleteProperty(obj, 'name2'))
  console.log(obj);
};

// demo4: Reflect.apply(func, thisArg, args)
// Reflect.apply方法等同于Function.prototype.apply.call(func, thisArg, args)， 用于绑定this对象后执行给定函数。

// demo5: 实例：使用 Proxy 实现观察者模式
const demoFunc5 = () => {
  const queneObservers = new Set();
  const observe = fn => queneObservers.add(fn);
  const obserable = obj => new Proxy(obj, { set });
  function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queneObservers.forEach(observer => observer());
    return result;
  }
};

export {
  demoFunc1,
  demoFunc2,
  demoFunc3,
  demoFunc4,
}
