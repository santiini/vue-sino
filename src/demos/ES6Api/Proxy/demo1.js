// proxy1

// demo1: proxy 简单使用

const demo1 = {};

const proxy = new Proxy(demo1, {
  get(target, property) {
    return 35;
  },
});

export default proxy;
