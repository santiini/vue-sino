<template lang="pug">
  .demo-functional-component
    group(title="函数式组件")
    demo1
</template>

<script>
  import { Group, Cell } from 'vux'
  import Demo1 from './Demo1.vue'

  export default {
    name: 'functional-component',
    components: {
      Group, Cell, Demo1,
    },
  }
</script>

<style lang="stylus" scoped>

</style>




