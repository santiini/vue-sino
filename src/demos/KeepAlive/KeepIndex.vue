<template lang="pug">
  .demo-keepAlive
    divider 组件缓存测试: {{$route.meta.keepAlive}}
    group(:title="title")
      cell(title="组件缓存" :link="{name: 'keep-alive'}")
      cell(title="组件不缓存" :link="{name: 'keep-not'}")
    group(title="内容展示")
      cell(title="组件缓存内容" :value="keepData")
      cell(title="组件没有缓存内容" :value="notKeepData")
</template>

<script>
  /* eslint-disable */
  import { Cell, Group, Divider } from 'vux'

  export default {
    name: 'keep',
    data() {
      return {
        title: '缓存组件demo',
        keepData: undefined,
        notKeepData: undefined,
      }
    },
    components: {
      Cell, Group, Divider,
    },
    methods: {
      onKeepData(data) {
        this[data.key] = data.value
      },
    },
    created() {
      this.$sino.bus && this.$sino.bus.$on('keepAliveData', this.onKeepData)
    },
    destroyed() {
      this.$sino.bus && this.$sino.bus.$off('keepAliveData', this.onKeepData)
    },
    beforeRouteLeave (to, from, next) {
      // 缓存和不缓存的跳转测试
      // 1. 由缓存--> 缓存跳转，正常
      // 2. 有不缓存 --> 缓存
      // 3. 由缓存 --> 不缓存，缓存页面都没有
      // tips: 1. 2和3在keep-alive的两种缓存方式中表现不一样
      // tips: 2. 问题产生的原因是： transition 和 keep-alive(v-if)的两个children组件产生的冲突
      if(to.name === 'keep-not') {
        to.meta.keepAlive = false
      }
      if(to.name === 'keep-alive') {
        to.meta.keepAlive = true
      }
      next()
    },
  }
</script>
