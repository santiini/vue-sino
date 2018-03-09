<template lang="pug">
  .demo-css-table-index
    .container
      .left 1111
      .right 自己的方式打开方式打开房间都是开发阶段刷卡缴费卡开始开放接口上自己的方式打开方式打开房间都是开发阶段刷卡缴费卡开始开放接口上自己的方式打开方式打开房间都是开发阶段刷卡缴费卡开始开放接口上
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'css-table-index',
    components: {
      Group, Cell,
    },
  }
</script>

<style lang="stylus" scoped>
  .container
    display table
    width 100%
    .left
      width: 30%
      display table-cell
      background-color #7979ec
    .right
      width: 70%
      display table-cell
      background-color #fb7878
      // word-break break-word
      white-space pre-wrap
</style>


