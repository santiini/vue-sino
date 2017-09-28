/**
 * 开发环境的组件导入
 */
/* eslint-disable */
module.exports = file => require('@/demos/' + file + '.vue').default

// 新版本vue-loader
// module.exports = file => require('@/views/' + file + '.vue').default  // vue-loader at least v13.0.0+

