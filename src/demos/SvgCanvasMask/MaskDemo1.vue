<template lang="pug">
  .demo-mask-demo1
    .main
      .bg
      .text Awesome
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'demo-svg-canvas-mask',
    components: {
      Group, Cell,
    },
  }
</script>

<style lang="stylus" scoped>
  .demo-mask-demo1
    position relative
    height 100%
  .main
    height 100vh
    width 100%
    overflow hidden
    position abolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    &:hover
      .text
        background-size 80% 80%
      .bg
        background-size 150% 150%
    .text
      height 100vh
      width 100%
      background-image url('../../assets/images/284838.jpg')
      background-size 100% 100%
      background-position center
      font-size 150px
      text-transform uppercase
      text-align center
      line-height 200px
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      padding-top 250px
      -webkit-background-clip text
      color transparent
      transition all 2.5s ease-in-out
    .bg
      height 100vh
      width 100%
      background-image url('../../assets/images/284838.jpg')
      background-size 100% 100%
      background-position center
      transform rotateY(180deg)
      transition all 2.5s ease-in-out
</style>
