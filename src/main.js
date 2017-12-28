/* eslint-disable */
require('es6-promise').polyfill();
import Vue from 'vue';
import FastClick from 'fastclick';
import { sync } from 'vuex-router-sync'
// 项目的第三方插件
import VueScroller from 'vue-scroller';
import {VueMasonryPlugin} from 'vue-masonry';  // api改变导致引用方式改变;
// npm插件的学习
import VueBetterScroller from 'vue-better-scroll'
// 1.引入项目的router，store
import router from './router';
import store from './store';
import App from './App';
// es6-Promise等的使用
// require('es6-promise').polyfill();

// 4.全局css文件的引用;
// less: less文件全局引入后，组件仍然需要单独引入，因为less中的变量和mixins 等在组件内不能直接使用 -- 已解决，通过插件sass-resources-loader
// import './style/base.less';
// import '../src/styles/main.scss';
import './style/scss/index.scss';
// import './style/stylus//index.styl'; // 测试全局引入.styl文件，失败;

// 该项目所有请求使用mockjs模拟 -- 本地mock数据
import './mock/index.js';

// 2. 引入项目中使用的plugins: vux插件
import { DatetimePlugin, CloseDialogsPlugin, ConfigPlugin, BusPlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin, AppPlugin } from 'vux'

store.registerModule('vux', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateDemoPosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    }
  },
  actions: {
    updateDemoPosition ({commit}, top) {
      commit({type: 'updateDemoPosition', top: top})
    }
  }
})


// global VUX config
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX' // global config for VUX, since v2.5.12
})

sync(store, router);

// plugins的使用
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(BusPlugin)
Vue.use(DatetimePlugin)

Vue.use(CloseDialogsPlugin, router)

// 第三方插件
Vue.use(VueScroller); // 滚动插件vue-scroller
Vue.use(VueMasonryPlugin); // 瀑布流插件vue-masonry
// 自定义插件
import { eventPlugin, IndexedDBPlugin } from './plugins'
Vue.use(eventPlugin)
Vue.use(IndexedDBPlugin)

// npm中定义插件的学习
Vue.use(VueBetterScroller)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

// console.log(router.options.routes)
// 3. vue-router的全局钩子函数：beforeEach 和 afterEach
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  // 改变路由的历史记录，决定route跳转的transition效果;
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  // 判断meta.keepAlive，组件是否缓存，并保存到keepAlList
  // console.log(to)
  // const { name } = to.name;
  const component = to.matched && to.matched[0].components;
  const { name } = component.default;
  let keepList = store.state.keepAlList;
  const keepIndex = keepList.indexOf(name);
  if (to.meta && to.meta.keepAlive) {
    keepIndex < 0 ? keepList.push(name) : '';
  } else {
    keepIndex > 0 ? keepList.splice(keepIndex, 1) : '';
  }
  store.commit('SET_KEEPLIST', { data: keepList });

  // 路由跳转
  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  if (process.env.NODE_ENV === 'production') {
    ga && ga('set', 'page', to.fullPath)
    ga && ga('send', 'pageview')
  }
})

FastClick.attach(document.body);

Vue.config.productionTip = false;

// tips： 导出 Vue 实例， 可以在其他js文件中使用；
const app = new Vue({
  router,
  store,
  // 方式1：eventHub依赖的组件挂载到根组件上;
  data() {
    return {
      eventHub: new Vue(),
    }
  },
  render: h => h(App),
}).$mount('#app-box');

// Vue 捕捉全局性的错误
Vue.config.errorHandler = (err, vm, info) => {
  console.log(err)
}

export default app;
