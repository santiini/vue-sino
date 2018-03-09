<template lang="pug">
  .demo-functional-component
    group(title="函数式组件")
    demo1(
      title="demo1-title"
      content="demo1-content"
      @clickBtn="clickBtn"
    )
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  import Demo1 from './Demo1.vue'
  import Demo2 from './Demo2.vue'

  export default {
    name: 'functional-component',
    components: {
      Group, Cell, Demo1, XButton, Demo2,
    },
    methods: {
      clickBtn() {
        console.log('functional 组件的 $emit')
      },
    },
  }
</script>

<style lang="stylus" scoped>

</style>




