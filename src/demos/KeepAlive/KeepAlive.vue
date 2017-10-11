<template lang="pug">
  .demo-keepAlive
    divider 组件缓存：{{$route.meta.keepAlive}}
    group(:title="title")
      cell(title="组件不缓存" :link="{name: 'keep-not'}")
      cell(title="组件缓存demo" :link="{name: 'keep-index'}")
    group(title="组件缓存输入")
      x-input(title="缓存输入" placeholder="请输入" @on-change="changeEmit")
</template>


<style lang="stylus" scoped>

</style>

<script>
  import { Cell, Group, XInput, Divider } from 'vux'

  export default {
    name: 'keep-alive',
    data() {
      return {
        title: '缓存组件demo',
      }
    },
    components: {
      Cell, Group, XInput, Divider,
    },
    methods: {
      changeEmit(val) {
        this.$sino && this.$sino.bus && this.$sino.bus.$emit('keepAliveData', { key: 'keepData', value: val })
      },
    },
    activated() {
      console.log('这是缓存组件的activated钩子')
    },
    created() {
      console.log('这是组件的一般周期：created')
    },
    beforeRouteLeave(to, from, next) {
      /* eslint-disable no-param-reassign */
      // tips: 动态更改组件是否缓存的状态;
      if (to.name === 'keep-not') {
        to.meta.keepAlive = true
      }
      next()
    },
  }
</script>
