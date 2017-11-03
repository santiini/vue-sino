# vue 的效率开发实践

## 基于vue-cli的自定义模板（Custom Templates）

vue-cli出了一个自定义模板功能，你fork官方的模板下来然后进行修改，然后用 vue-cli 来调用。具体调用的场景有以下两种:

1. 直接拉取git源：

当你修改了模板并上传了repo上，可执行以下命令行来初始化
```
  vue init username/repo my-project
```

2. 拉取本地的模板：
```
vue init duosanglee/vuejs-custom-template
```

## 引入sass全局变量，mixin，function等

sass-resources-loader就来拯救我们了，他可以省去重复性的引入，还支持LESS，POSTCSS等,具体用法如下：

* npm install -D sass-resources-loader

* 首先得找到项目里的build文件夹，找到util.js，添加一下代码

```js
function resolveResouce(name) {
    return path.resolve(__dirname, '../src/style/' + name);
}
function generateSassResourceLoader() {
    var loaders = [
      cssLoader,
      // 'postcss-loader',
      'sass-loader',
      {
          loader: 'sass-resources-loader',
          options: {
            // it need a absolute path
            resources: [resolveResouce('common.scss')]
          }
      }
    ];
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
}
```
然后还是在当前文件里找到
```js
return {
  css: generateLoaders(),
  postcss: generateLoaders(),
  less: generateLoaders('less'),
  sass: generateLoaders('sass', { indentedSyntax: true }),
  scss: generateLoaders('sass'),
  stylus: generateLoaders('stylus'),
  styl: generateLoaders('stylus')
}
```
替换成
```js
return {
  css: generateLoaders(),
  postcss: generateLoaders(),
  less: generateLoaders('less'),
  sass: generateSassResourceLoader(),
  scss: generateSassResourceLoader(),
  stylus: generateLoaders('stylus'),
  styl: generateLoaders('stylus')
}
```
这样就可以在项目里使用sass全局变量，mixin，function

## 在线 Mock 平台 easy-mock

推荐easy-mock工具，支持团队协作编辑，生成模拟数据的在线 mock 服务，还支持导入swagger文档等功能,

## 定义全局变量

在项目会有需要使用全局变量的需求, 大家都应该会绑定到window对象上，但是这种方式不适合服务端渲染，因为服务端没有 window 对象, 是 undefined

1. 代理到Vue的原型对象

由于所有的组件都会从 Vue 的原型对象上继承它们的方法, 因此我们只要
```js
Object.defineProperty(Vue.prototype, '$xxx', { value: xxx });
```
就可以在所有组件/实例中通过 this.$xxx: 的方式访问插件了~而不需要定义全局变量或者手动的引入了

至于为什么要用Object.defineProperty这个方法，是因为通过Object.defineProperty绑定的属性是只读的，以防一起开发项目的协(zhu)作(dui)者(you)去重写或者覆盖该方法的值。

2. vuex

## 组件设计

* 通信： vue的父子组件通信机制是props down，events up，尽量保持松耦合，一直保持单向数据流的特点，并加以强约束。需要注意的时候，尽可能减少跨组件通信，例如使用$parent，$root。

* 当两个组件存在些许的共性，又存在足够的差异性的时候，就可以用到vue的继承---mixin，他允许你封装一块在应用的其他组件中都可以使用的函数。如果使用姿势正确，他们不会改变函数作用域外部的任何东西。而且mixin还有各种高阶用法，大家可自行查询（我也不会）。

* 组件的黑箱状态既只暴露易变的接口和方法，渲染给入的数据，组件内部封装不变的逻辑。

* 运用设计模式原则，比如单一职责原则，将组件拆分抽离成更细粒度，保证高内聚性；再如接口隔离原则，采用稳定的服务端接口，将变化模块分离，使得组件得以解耦；里氏替换原则、依赖倒置原则等等。。

## 自动生成雪碧图

前端项目中自动生成雪碧图节省了我们很多的时间，我们只要把图片扔到文件夹里，webpack-spritesmith就能按照我们设定的规则自动合成css-sprite，安装配置如下：

```js
var SpritesmithPlugin = require('webpack-spritesmith');
...
module.exports = {
  ...
  plugins: [
    new SpritesmithPlugin({
      src: {
        cwd: './src/assets/sp/',
        glob: '*.png'
      },
      target: {
        image: './src/assets/sprite/sprite.png',
        css: './src/assets/sprite/sprite.css'
      },
      apiOptions: {
        cssImageRef: './sprite.png'
      },
      spritesmithOptions: {
        algorithm: 'top-down',
        padding: 100
      }
    })
  ]
}
```

## 自动修复eslint格式错误

这个功能的建立在小伙伴的开发工具是vscode情况下~
首先在vscode扩展里面安装vscode的eslint插件，然后settings.json里添加如下配置:

```js
"eslint.validate": [
    "javascript",
    "javascriptreact",
    {
        "language": "html",
        "autoFix": true
    },
    {
        "language": "vue",
        "autoFix": true
    }
],
"eslint.autoFixOnSave": true,
```

## 跨域

在浏览vue-cli的官方文档时候发现了vue-cli自带了API proxy，解决了在项目中后端联调的时候的跨域问题。具体安装配置如下：
首先我们找到config文件下的index.js,再找到dev对象下的proxyTable属性，然后把以下代码添加进去

```js
proxyTable: {
  '/api': {
    target: '网站名',
    pathRewrite: {
      '^/api': ''
    }
  }
}
```

然后重启本地服务器，这样你发送的/api/a就会代理发送到"网站名/a"了~


