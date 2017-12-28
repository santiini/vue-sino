<template lang="pug">
  .demo-vue-extends-index
    component(:is="currentView" :name="currentView" :type="type")
    group(title="extends的测试")
      x-button(@click.native="changeView") 改变组件
      x-button(@click.native="changeType") 改变type
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  import Demo1 from './demo1'
  import Demo2 from './demo2'

  // vue: is 特性来动态渲染组件;
  // 1. 通过 data 中的 currentView 对应不同的组件渲染
  // 2. 在内置组件 component 上用 is 绑定 currentView
  // 3. 通过 props 向 component 传递统一参数
  export default {
    name: 'demos-vue-extends-index',
    components: {
      Group, Cell, XButton, Demo1, Demo2,
    },
    methods: {
      changeView() {
        this.currentView = this.currentView === 'Demo1' ? 'Demo2' : 'Demo1'
      },
      changeType() {
        this.type = this.type === 1 ? 2 : 1
      },
    },
    data() {
      return {
        currentView: 'Demo1',
        type: 2,
        // currentView: Demo1,
      }
    },
  }
</script>
