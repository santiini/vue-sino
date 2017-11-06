/* eslint-disable */

// demp8: decorator 实现自动发布事件

import postal from 'postal/lib/postal.lodash';

// publish的修饰器: 通过改写descriptor.value，使得原方法被调用时，会自动发出一个事件。
function publish(topic, channel) {
  // 返回 decorator 函数
  return function(target, name, descriptor) {
    const fn = descriptor.value;

    descriptor.value = function() {
      // 获取函数的返回值
      let value = fn.apply(this, arguments);
      // 事件派发, 以返回值作为参数
      postal.channel(channel || target.channel || '/')
        .publish(topic, value);
    };
  }
}

// 自定义事件的订阅
postal.subscribe({
  channel: 'component',
  topic: 'foo.some.msg',
  callback: function(data, envelope) {
    console.log(data);
    console.log(envelope);
  },
});
postal.subscribe({
  channel: '/',
  topic: 'foo.some.other',
  callback: function(data, envelope) {
    // 第一个参数：传递的数据对象： data
    console.log(data);
    // 第二个参数: 封装的参数信息: channel, data, topic等
    console.log(envelope);
  },
});

postal.subscribe({
  channel: 'test',
  topic: 'foo.test',
  callback(data, envelope) {
    console.log(data);
    console.log('测试自定义事件');
  },
})


// 使用上面的 publish 修饰器
class FooComponent {
  status = true;

  @publish('foo.some.msg', 'component')
  someMethod() {
    console.log('some method');
    return {
      title: 'publish title',
    };
  }

  @publish('foo.some.other')
  sayHi() {
    console.log('hi pushlish');
  }

  // 测试自定义事件
  @publish('foo.test', 'test')
  changeStatus() {
    console.log(`status: ${this.status}`)
    this.status = !this.status
    console.log(`status: ${this.status}`)
    return {
      status: this.status
    }
  }
}

export default FooComponent;
