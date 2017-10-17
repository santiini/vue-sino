<template lang="pug">
  .demo-css-mask
    group(title="10个css的Mask")
      cell(title="demo1" :link="{ name: 'mask-demo1'}")
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

</style>
