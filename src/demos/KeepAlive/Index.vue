<template lang="pug">
  .demo-keepAlive
    divider 组件缓存测试
    group(:title="title")
      cell(title="组件缓存" :link="{name: 'keep-alive'}")
      cell(title="组件不缓存" :link="{name: 'keep-alive'}")
</template>

<script>
  /* eslint-disable */
  import { Cell, Group, Divider } from 'vux'

  export default {
    name: 'keep',
    data() {
      return {
        title: '缓存组件demo',
      }
    },
    components: {
      Cell, Group, Divider,
    },
    beforeRouteLeave (to, from, next) {
      if(to.name === 'keep-alive') {
        to.meta.keepAlive = true
      }
      next()
    },
  }
</script>
