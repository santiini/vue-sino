var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

    // 1. sass-resources-loader配置： 为了sass文件的全局引用和使用;
  function resolveResouce(name) {
    return path.resolve(__dirname, '../src/style/scss/' + name);
    // return path.resolve(__dirname, '../src/styles/' + name);
  }
  // 2. sass-resources-loader配置：
  function generateSassResourceLoader() {
    var loaders = [
      cssLoader,
      'postcss-loader',
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          // it need a absolute path
          // tips: 1。main.scss 的结构太复杂，需要理清之后，把变量，mixins提出来以供使用；
            // 2. main.scss 中的文件引入方式在这里的解析有问题;
            // 3. 问题： 不能在引入的文件中 @import '_mixins.scss' 引用其他文件，这里会报错;
          // resources: [resolveResouce('_variables.scss'), resolveResouce('_mixins.scss'), resolveResouce('_helpers.scss')]
          // resources: [resolveResouce('main.scss')]
          resources: [resolveResouce('var.scss'), resolveResouce('mixins.scss')]
        }
      }
    ];

    // 返回sass-loader的处理依赖数组;
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }

  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    // sass: generateLoaders('sass', { indentedSyntax: true }),
    // scss: generateLoaders('sass'),
    // 3. sass-resources-loader配置：
    // 用新的函数生成的loaders 解析sass,scss;
    sass: generateSassResourceLoader(),
    scss: generateSassResourceLoader(),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
