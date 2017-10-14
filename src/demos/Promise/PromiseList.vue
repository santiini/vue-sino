<template lang="pug">
  .demo-promise-list
    group(title="Promise的高阶使用")
      cell(title="1.异步流程控制" :link="{ name: 'promise-images' }")
      cell(title="2.多图片加载测试" :link="{ name: 'promise-image-load' }")
    group(title="stylus测试")
      .stylus-demo stylus测试
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'demo-promose-list',
    components: {
      Group, Cell,
    },
    // methods: {
    // },
  }
</script>

<style lang="stylus" scoped>
  @import './PromiseList.styl'
</style>


