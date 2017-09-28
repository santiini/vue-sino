/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex';
import header from './module/xHeader'
import vux from './module/vux'

Vue.use(Vuex);

const state = {
  isLoading: false,
  direction: 'foreard',
};

export default new Vuex.Store({
  state,
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


