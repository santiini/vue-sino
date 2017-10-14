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

## vue-cli的最佳实践

### 全局使用sass,less中的变量，mixins,function

#### sass, less变量的全局使用 -- sass-resources-loader

> 修改build/util.js文件，详情查看： https://segmentfault.com/a/1190000010324128#articleHeader2

#### sass, less, stylus的相同点和不同点

1. 嵌套语法相同， 包括选择器的嵌套、父选择器的引用`&-`

2. 变量声明，less和sass需要借助特殊符号，less声明：@red: #c00, sass声明： $red: #c00, stylus声明：red = #c00;

3. 变量的作用域：sass和stylus一致，变量值输出时根据之前最近的一次定义计算。<br>
Less 更倾向接近 CSS 的声明式，计算过程弱化调用时机；而 Sass 和 Stylus 更倾向于指令式。

4. !default -- 适用于sass和stylus, 解决3产生的不一致问题，重写变量值来覆盖样式，重写第三方库的样式，需要第三方库的变量声明采用 !default

5. 选择器插值：三者差不多。

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

1. 引入mockjs

2. 创建Mock文件夹，完善相关模块
  * index.js 核心模块： 匹配axios请求的地址进行拦截，Mock.mock(turl, type, function(options))返回值
  * 将不同的url对应的内容模块化处理，从核心模块分离
  * 在每个单独模块中，处理function(options)的逻辑，获取请求参数options，并利用MockApi，生成返回数据;

3. 在main.js中，引入Mock的核心模块
```js
  // 该项目所有请求使用mockjs模拟
  import './mock/index.js';
```

#### Easy-Mock模拟数据，通过网络

> 详情可查看： http://www.easy-mock.com/login

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
