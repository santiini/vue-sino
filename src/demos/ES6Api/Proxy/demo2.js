// demo2: proxy
// 同一个拦截器函数，可以设置拦截多个操作。

const handler = {
  // 获取值
  get(target, name) {
    if (name === 'protorype') {
      return Object.protorype;
    }
    return `Hello, ${name}`;
  },

  // 作为方法使用
  apply(target, thisBinding, args) {
    return args[0];
  },

  // 作为构造函数， 使用实例
  construct(target, args) {
    return { value: args[1] };
  },
};

const Func = (x, y) => x + y;
const proxy = new Proxy(Func, handler);

export default proxy;
