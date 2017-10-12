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

### vux中的scrollbar的css问题：--待解决

### keep-alive和router-view结合的两种方式的解析

1. keep-alive在2.2.0+版本中，利用属性include和exclude(最高优先级)来匹配 字符串、正则表达式 (使用 `v-bind`)、数组 (使用 `v-bind`)

```html
  <!-- 逗号分隔字符串 -->
  <keep-alive include="a,b">
    <component :is="view"></component>
  </keep-alive>
  <!-- 正则表达式 (使用 `v-bind`) -->
  <keep-alive :include="/a|b/">
    <component :is="view"></component>
  </keep-alive>
  <!-- 数组 (使用 `v-bind`) -->
  <keep-alive :include="['a', 'b']">
    <component :is="view"></component>
  </keep-alive>
  <!-- 动态判断 -->
  <keep-alive :include="includedComponents">
    <router-view></router-view>
  </keep-alive>
  <!-- 实际使用: 判断meta.keepAlive，组件是否缓存，并保存到keepAlList, 用vuex管理; -->
  <keep-alive :include="keepAlList">
    <router-view></router-view>
  </keep-alive>
```
2. keep-alive和route.meta.keepAlive结合

```html
  <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
```

3. 可能出现的问题：内置组件transition和方式2结合使用不理想，可以和方式1结合使用，并维护一个和meta.keepAlive相关的keepAlList来实现相同效果

### Mock数据的使用

#### MockJS模拟本地数据，无需通过网络

#### Easy-Mock模拟数据，通过网络

### vue框架中jquery的使用注意项

1. 基本使用：在vue-cli构建项目下，修改build/webpack.base.conf.js

```js
// 在开头引入webpack，后面的plugins那里需要
var webpack = require('webpack')
// resolve

module.exports = {
   // 其他代码...
   resolve: {
      extensions: ['', '.js', '.vue'],
      fallback: [path.join(__dirname, '../node_modules')],
      alias: {
          'src': path.resolve(__dirname, '../src'),
          'assets': path.resolve(__dirname, '../src/assets'),
          'components': path.resolve(__dirname, '../src/components'),

          // webpack 使用 jQuery，如果是自行下载的
          // 'jquery': path.resolve(__dirname, '../src/assets/libs/jquery/jquery.min'),
          // 如果使用NPM安装的jQuery
          'jquery': 'jquery'
      }
   },

   // 增加一个plugins
   plugins: [
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      })
   ],

   // 其他代码...
}
```

> 这样就可以正确的使用jQuery了，比如我要引入Bootstrap，我们在vue的入口js文件src/main.js开头加入<br>
// 使用Bootstrap<br>
```js
import './assets/libs/bootstrap/css/bootstrap.min.css'
import './assets/libs/bootstrap/js/bootstrap.min'
```
> 这样Bootstrap就正确的被引用并构建。<br>
在比如使用toastr组件，只需要在需要的地方import进来，或者全局引入css在需要的地方引用js，然后直接使用<br>
// 使用toastr
```js
import 'assets/libs/toastr/toastr.min.css'<br>
import toastr from 'assets/libs/toastr/toastr.min'<br>

toastr.success('Hello')
```

2. vue-cli webpack全局引入jquery

> jquery的全局使用，借助于webpack的plugins选项

  1. 首先在package.json里加入jquery, nmp install jquery --save

  2. 在webpack.base.conf.js里加入
  ```js
  var webpack = require("webpack")
  ```
  3. 在module.exports的最后加入
  ```js
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    })
  ]
  ```
  4. 然后一定要重新 run dev
  5. 在main.js 引入就ok了 -- 好像不用
