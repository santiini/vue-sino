/* eslint-disable */
// set(target, propKey, value, receiver)：
// 拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
// 4个参数信息:
//   1. 目标对象
//   2. 属性名
//   3. 属性值
//   4. Proxy 实例本身

// demo1: 假定Person对象有一个age属性，该属性应该是一个不大于200的整数，那么可以使用Proxy保证age的属性值符合要求。
// 拦截handler
const validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      console.log('age属性')
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // 对应age意外的属性，直接保存;
    obj[prop] = value;
    // tips: 代理并设置属性之后，必须 return
    return true;
    // return value;  // 可以 return true or value
  },
};
const person = new Proxy({}, validator);

// demo2: 实现内部属性，禁止访问下划线(_)的方法
// 拦截handler
const privator = {
  get(target, key) {
    invariant(key, 'get');
    return target[key];
  },
  set(target, key, value) {
    invariant(key, 'set');
    target[key] = value;
    return true;
  },
};
// 验证函数
function invariant (key, action) {
  if (key[0] === '_') {
    throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    // console.error(`Invalid attempt to ${action} private "${key}" property`)
    return
  }
}
const Role = {
  age: 17,
  _age: 28,
  name: '覃飞',
  _name: '郑秋冬',
  work() {
    console.log('年薪45万，赢取白富美，走上人生巅峰');
  },
  _work() {
    console.log('传销入狱，惨惨惨');
  }
};

// demo3: 第4个参数receiver: 总是返回this关键字所指向的那个对象，即proxy实例本身。
const selfHanlder = {
  set(target, prop, value, receiver) {
    target[prop] = receiver;
    return true;
  },
};
const selfWrapper = obj => new Proxy(obj, selfHanlder);

const proxyRole = new Proxy(Role, privator);

export {
  validator,
  person,
  proxyRole,
  Role,
  selfWrapper,
}
