<template lang="pug">
  .demo-vue-long-tap-index
    group(title="long-tap指令")
      .long-tap-div(v-long-touch="longTapHandler")
</template>

<script>
  import { Group, Cell } from 'vux'
  import LongTap from '../../directives/long-tap'

  export default {
    name: 'vue-long-tap-index',
    directives: {
      LongTap,
    },
    components: {
      Group, Cell,
    },
    methods: {
      longTapHandler() {
        console.log(11111111)
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .long-tap-div
    margin 20px
    width 50px
    height 50px
    background-color red
</style>


