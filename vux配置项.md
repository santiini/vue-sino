# vux -- 基于Vue的移动端框架

> 通用配置项以及解决的问题说明

## 配置所要达到的目的

1. 利用手淘flexible布局，字体需要根据dpr看来改变大小

2. 利用postcss-px2rem自动转换页面中的rem，但是字体不转换，border利用1px方案解决也不转换

3. 自动添加浏览器兼容前缀

4. 利用fastclick解决点击延迟问题

5. 安装postcss和scss还有less

6. 转换vux的px为PX，因为weUI没有使用rem，使用的是em和px，但是又不能把它的px给转换成rem，而且vux还有一个1px.less，也不能把它的px转换成大写。但是浏览器不管px是大小写，都能按照px解析。

7. sass 中变量，mixins 的全局使用


## 配置的具体说明

### lib-flexible -- 手淘flexible布局

```js
  npm i lib-flexible -S
  // 在main.js 引入
  import 'lib-flexible'
```
到这里只是调用，剩下的使用方法下面解决。

### postcss 插件 -- 解决 rem 和 浏览器前缀兼容问题

```js
  npm i postcss-loader postcss-px2rem -D
  // 按照vux的webpack按照的，问题3可省略
  npm i autoprefixer -D
```

autoprefixer的配置说明： http://www.cnblogs.com/aNd1coder/archive/2013/08/12/3252690.html

rem 和 px 的转换问题：

在build的vue-loader.conf.js配置postcss

```js
postcss: [
    require('autoprefixer')({
      browsers: ['iOS >= 7', 'Android >= 4.1']
    }),require('postcss-px2rem')({
      rootValue: 75, // 这里对应的是750的设计图尺寸
      selectorBlackList: ['html'],
      mediaQuery: true,
      propBlackList: ['border-radius','border'] // 如果要保持font-size不转换，替换为 ['font-size']
    })
  ]
```

然后手淘方案有字体根据dpr动态改变，所以书写CSS的时候要在后面加上注释，如下：

```css
.selector {
    width: 150px;
    height: 64px; /*px*/
    font-size: 28px; /*px*/
    border: 1px solid #ddd; /*no*/
}

```

生成css代码：

```css
.selector {
    width: 2rem;
    border: 1px solid #ddd;
}
[data-dpr="1"] .selector {
    height: 32px;
    font-size: 14px;
}
[data-dpr="2"] .selector {
    height: 64px;
    font-size: 28px;
}
[data-dpr="3"] .selector {
    height: 96px;
    font-size: 42px;
}
```

因为我配置了border不转换，所以/*no*/，可以不用加，加了也不顶用。但是字体一定要使用/*px*/这个注释。这样才能根据dpr改变字体大小。chrome的移动端调试工具不支持dpr改变，所以可以手动改变dpr查看效果

### fastclick -- 解决点击延迟问题

在main.js里面引入

```js
  import FastClick from 'fastclick'
  FastClick.attach(document.body)
```

### scss, less 等安装

```
  npm i node-sass sass-loader scss-loader -D
```

### vux中，WeUI的px和em 转化为 rem

按照vux的webpack安装的,只需要打开webpack.base.conf.js文件，然后把最下面的module.exports修改为以下内容:

```js
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui', 'progress-bar', 'duplicate-style',{
    name: 'after-less-parser',
    fn: function (source) {
      if (this.resourcePath.replace(/\\/g, '/').indexOf('/vux/src/components') > -1) {
        source = source.replace(/px/g, 'PX')
      }
      // 自定义的全局样式大部分不需要转换
      if (this.resourcePath.replace(/\\/g, '/').indexOf('App.vue') > -1) {
        source = source.replace(/px/g, 'PX').replace(/-1PX/g, '-1px')
      }
      return source
    }
  }, {
    name: 'style-parser',
    fn: function (source) {
      if (this.resourcePath.replace(/\\/g, '/').indexOf('/vux/src/components') > -1) {
        source = source.replace(/px/g, 'PX')
      }
      // 避免转换1PX.less文件路径
      if (source.indexOf('1PX.less') > -1) {
        source = source.replace(/1PX.less/g, '1px.less')
      }
      return source
    }
  }]
})

```

如果不是，那就这样改，把module.exports的内容改成以上内容。

```js
const vuxLoader = require('vux-loader')
const webpackConfig = originalConfig // 原来的 module.exports 代码赋值给变量 webpackConfig

module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})
```

### sass-resources-loader -- 全局 scss 变量，mixin 的配置和使用

1. npm install -D sass-resources-loader 安装

2. 首先得找到项目里的build文件夹，找到 util.js 添加一下代码

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
              resources: [resolveResouce('var.scss'), resolveResouce('mixins.scss')]
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
这样就可以在项目里使用sass全局变量，mixin，function了

参考文档

vux文档

npm网站

大漠的手淘布局方案flexible

vux的github
