<template lang="pug">
  .demo-vue-extends
    group(:title="title")
      x-input(title="姓名" v-model="name")
      component(:is="curView" :name="curView === 'Com1' ? 'demo1' : 'demo2'" :list="list" @clickCell="onClickCell")
    group(title="动态改变组件")
      x-button(@click.native="changeView") 改变组件
</template>

<script>
  import { Group, Cell, XButton, XInput } from 'vux'

  import Com1 from './Com1'
  import Com2 from './Com2'

  // 利用 is 特性把 component 作为一个公共的子组件，传递 props，并进行时间监听;
  // tips: 类似 hoc 的概念， 实现相同功能组件用 component 切换，不同的获取在当前组件区分;
  export default {
    name: 'demos-vue2-is-component1',
    components: {
      Group, Cell, XButton, Com1, Com2, XInput,
    },
    methods: {
      changeView() {
        this.curView = this.curView === 'Com1' ? 'Com2' : 'Com1'
      },
      onClickCell(name) {
        console.log(name)
      },
      getName() {
        this.name = '孙小涛'
      },
    },
    watch: {
      curView: {
        handler(newVal, oldVal) {
          if (newVal === oldVal) return
          if (newVal === 'Com1') {
            this.list = [1, 2, 3, 4, 5, 6, 7]
          } else {
            this.list = [
              { id: 1, name: 'name111' },
              { id: 2, name: 'name222' },
              { id: 3, name: 'name333' },
              { id: 4, name: 'name444' },
              { id: 5, name: 'name555' },
              { id: 6, name: 'name666' },
            ]
          }
        },
        immediate: true,
      },
    },
    created() {
      console.log('is特性的index');
      console.log('根据不同组件使用不同方法获取数据')
      this.getName()
    },
    data() {
      return {
        title: 'index组件',
        curView: 'Com1',
        // curView: Com1,
        list: [],
        name: '3243242',
      }
    },
  }
</script>

