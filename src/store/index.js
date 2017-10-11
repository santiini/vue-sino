/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex';
import header from './module/xHeader'
import vux from './module/vux'
import mutations from './mutations'

Vue.use(Vuex);

const state = {
  isLoading: false,
  direction: 'foreard',
  keepAlList: [], // 动态判断组件是否需要keep-alive的数组
};

export default new Vuex.Store({
  state,
  mutations,
  // mutations: {
  //   UPDATE_LOADING (state, status) {
  //     state.isLoading = status
  //   },
  //   UPDATE_DIRECTION (state, direction) {
  //     state.direction = direction
  //   },
  // },
  modules: {
    header, header,
  },
})


