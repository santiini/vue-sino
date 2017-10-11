<template>
  <div class="">
    <divider>组件缓存：{{$route.meta.keepAlive}}</divider>
    <group :title="title">
        <cell title="组件缓存" :link="{name: 'keep-alive'}"></cell>
        <cell title="组件缓存demo" :link="{name: 'keep-index'}"></cell>
    </group>
    <group title="组件不缓存">
      <x-input title="输入内容不缓存" placeholder="不缓存输入" @on-change="changeEmit"></x-input>
    </group>
  </div>
</template>

<style lang="less" scoped>

</style>

<script>
  import { Cell, Group, XInput, Divider } from 'vux'

  export default {
    name: 'keep-not',
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
        this.$sino && this.$sino.bus && this.$sino.bus.$emit('keepAliveData', { key: 'notKeepData', value: val })
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
      if (to.name === 'keep-alive') {
        to.meta.keepAlive = true
      }
      next()
    },
  }
</script>
