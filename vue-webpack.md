# Vue 和 Webpack 的种种

## 项目实际问题和解决

### es6-promise, babel相关

1. > 错误描述：'[vuex] vuex requires a Promise polyfill in this browser. ' <br>

  原因分析：因为浏览器不能兼容 es6 的 Promise 语法 <br>

  解决：
  1. babel-polyfill 安装

  2. 在webpack.config.js文件中，使用
  ```js
    module.exports = {
      entry: {
        app: ["babel-polyfill", "./src/main.js"]
      }
    };
  ```
