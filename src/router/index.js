import Vue from 'vue';
import Router from 'vue-router';
import { menus } from '@/data'

/* eslint-disable */
// 开发环境不使用组件懒加载，提升webpack编译速度; 生产环境使用component-lazy-load;
const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router);

// 获取菜单路由
const firstUpper = str => str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
// const firstUpper = str => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
const upperName = (name) => {
  const names = name.split('-').map(el => firstUpper(el)).join('')
  return names
};
// 根据data 动态配置路由列表 -- 路由级数和路由名称的大小写转化;
const menuRoutes = menus.reduce((prev, cur) => {
  if (cur.list) {
    // 这是一个多路由的配置
    cur.list.forEach((name) => {
      prev.push({
        path: `/demos/${cur.name}/${name}`,
        name,
        component: _import(`${upperName(cur.name)}/${upperName(name)}`),
      })
    })
  } else {
    // 单一路由的配置
    const { name } = cur;
    prev.push({
      path: `/demos/${name}`,
      name,
      component: _import(`${upperName(name)}/index`),
    })
  }
  return prev;
}, []);
console.log(menuRoutes)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // 路由懒加载
      // 路由懒加载方式1： resolve => require([], resolve)
      // component: resolve => require(['@/demos/Home'], resolve)
      // 路由懒加载方式2: () => import('')
      // 路由非懒加载
      // component: require('../demos/Home').default,
      // component: () => import('@/demos/Home'),
      component: _import('Home'),
    },{
      path: '/demos',
      name: 'demos',
      component: _import('Demos'),
    },
    // 用于组件缓存测试的组件
    // ...
    ...menuRoutes,
    // {
    //   path: '/demos/class',
    //   name: 'class',
    //   component: _import('DemoClass/index'),
    // }
  ],
});
