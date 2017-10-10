# vux-demo

> extend vux componnets and plugins

## Build Setup

### vue-stylus-pug使用时的注意点

#### pug在vue中的使用

1. pug中使用vue的自定义指令时，直接使用时报错。解决方法：使用v-transfer-dom时，传入默认参数 v-transfer-dom=""

```pug
  .actionsheet(v-transfer-dom="")
  // 而不是
  .actionsheet(v-transfer-dom)
```

### vue路由懒加载的注意事项

> 懒加载的实现的两种方式

1. resolve 的方式

```js
  component: resolve => require(['./Home.vue'], resolve)
```

2. import 的方式

```js
  component: () => import('./Home.vue')
```

3. 非路由懒加载时

```js
  component: require('./Home.vue').default

```

### ajax请求的缓存问题: 通过时间戳解决问题 -- get请求

为get请求添加额外时间戳参数：例如 t=new Date().getTime(), 在axios中，可以在发送前的拦截器中设置;

### vux中的scrollbar的css问题：
