<template lang="pug">
  .demo-vue-http
    group(title="fly.js")
      cell(title="1. 类似Axios")
      cell(title="2. Node中可以用，上传下载api, fly.$http集成了request库的功能")
      cell(title="3. 轻量级")
      cell(title="4. 请求转发, 混合app中，解决webview无法拦截ajax请求的问题")
      x-button(@click.native="testDemo1") 测试 fly
      x-button(@click.native="toFlyIO") 更多详情
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  export default {
    name: 'demo-vue-http',
    components: {
      Group, Cell, XButton,
    },
    methods: {
      testDemo1() {
        console.log(1111111111)
      },
      toFlyIO() {
        window.open('https://wendux.github.io/dist/#/doc/flyio/node')
      },
    },
  }
</script>

<style lang="stylus" scoped>

</style>


