/* eslint-disable */
import Vue from 'vue';
import FastClick from 'fastclick';
import { sync } from 'vuex-router-sync'

import router from './router';
import store from './store';
import App from './App';

require('es6-promise').polyfill()

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

// plugins
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


// 自定义插件
import { eventPlugin, IndexedDBPlugin } from './plugins'
Vue.use(eventPlugin)
Vue.use(IndexedDBPlugin)

// simple history management
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

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

  router.afterEach(function (to) {
    store.commit('updateLoadingStatus', {isLoading: false})
    if (process.env.NODE_ENV === 'production') {
      ga && ga('set', 'page', to.fullPath)
      ga && ga('send', 'pageview')
    }
  })

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

FastClick.attach(document.body);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
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
