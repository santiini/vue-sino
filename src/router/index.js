import Vue from 'vue';
import Router from 'vue-router';
import { menus, vuxComponents, VueApi, es6Api, CssStudy } from '@/data'

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
    cur.list.forEach((item) => {
      const { name, meta, isHome } = item
      if (cur.isExpanded) {
        // debugger
      }
      const path = item.path || `/demos/${cur.name}/${name}`
      // const component = item.component || `${upperName(cur.name)}/${upperName(name)}`
      const component = item.component
        || (cur.isExpanded && !isHome && `${upperName(cur.name)}/${upperName(name)}/index`)
        || `${upperName(cur.name)}/${upperName(name)}`
      prev.push({
        // path: `/demos/${cur.name}/${name}`,
        path,
        name: `menu-${cur.name}-${name}`,
        meta,
        component: _import(component),
        // component: _import(`${upperName(cur.name)}/${upperName(name)}`),
      })
    })
  } else {
    // 单一路由的配置
    const { name, meta } = cur;
    const path = cur.path || `/demos/${name}`
    const component = cur.component || `${upperName(name)}/index`
    prev.push({
      path,
      // path: `/demos/${name}`,
      name: `menu-${name}`,
      meta,
      component: _import(component),
      // component: _import(`${upperName(name)}/index`),
    })
  }
  return prev;
}, []);
// console.log(menuRoutes)

// routes -- vux组件的相关路由
const vuxRoutes = vuxComponents.map((component) => {
  if (component.isHome) {
    return {
      path: '/vux/list',
      name: 'vux-list',
      component: _import('VuxComponents/VuxList'),
    }
  }
  const { name, meta } = component;
  const path = component.path || `/vux/component/${name}`;
  const componentPath = component.component || `VuxComponents/Demos/${upperName(name)}`
  return {
    path,
    name: `vux-${name}`,
    component:_import(componentPath),
    // component: _import(`VuxComponents/Demos/${upperName(name)}`),
  }
});
// console.log(vuxRoutes);

// routes: Vuejs 相关的路由
const VueRoutes = VueApi.reduce((prev, cur) => {
  if (cur.isHome) return prev;
  const { name, meta } = cur;
  const path = cur.path || `/vue/api/2.X/${name}`;
  const component = cur.component || `Vue2.X/${upperName(name)}/index`;
  prev.push({
    path,
    name: `vue-${name}`,
    component: _import(component),
  })
  return prev;
}, []);

// routes: es6 相关的路由
const es6Routes = es6Api.reduce((prev, cur) => {
  if (cur.isHome) return prev;
  if (cur.list) {
    cur.list.forEach((router) => {
      const { name, meta } = router;
      const path = router.path || `/es6/api/${cur.name}/${name}`;
      const component = router.component || `ES6Api/${upperName(cur.name)}/${upperName(name)}`
      prev.push({
        path,
        name: `es6-${cur.name}-${name}`,
        component: _import(component),
      })
    })
  } else {
    const { name, meta } = cur;
    const path = cur.path || `/es6/api/${name}`;
    const component = cur.component || `ES6Api/${upperName(name)}/index`;
    prev.push({
      path,
      name: `es6-${name}`,
      component: _import(component),
    })
  }
  return prev;
}, []);
// console.log(es6Routes);

// routes: Vuejs 相关的路由
const cssRoute = CssStudy.reduce((prev, cur) => {
  if (cur.isHome) return prev;
  const { name, meta } = cur;
  const path = cur.path || `/css/study/${name}`;
  const component = cur.component || `CssStudy/${upperName(name)}/index`;
  prev.push({
    path,
    name: `css-${name}`,
    component: _import(component),
  })
  return prev;
}, []);

console.log(cssRoute)

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
    // 1. 菜单的路由
    ...menuRoutes,
    // 2. vux 组件的路由
    ...vuxRoutes,
    // 3. vue-api 的路由
    ...VueRoutes,
    // 4. es6-api 的路由
    ...es6Routes,
    // 5. css进阶
    ...cssRoute,
    // {
    //   path: '/demos/class',
    //   name: 'class',
    //   component: _import('DemoClass/index'),
    // }

    // 一些特殊的不符合规则的路由
    {
      path: '/core-decorator',
      name: 'core-decorator',
      component: _import('ES6Api/Decorator/CoreDecorator/index')
    }
  ],
});
