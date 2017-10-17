/**
 * 函数式组件
 */
import Vue from 'vue'
import Demo1 from './Demo1.vue'

Vue.component(Demo1, {
  functional: true,
  render(createElement, content) {
    // return createElement(Demo1)
  },
})

