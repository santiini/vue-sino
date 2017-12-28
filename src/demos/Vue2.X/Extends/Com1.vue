<template lang="pug">
  .demo-vue-extends
    group(:title="title")
      cell(title="前往扩展组件")
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  export default {
    name: 'demos-vue2-extends-component1',
    components: {
      Group, Cell, XButton,
    },
    methods: {

    },
    create() {
      console.log('源组件的created');
    },
    data() {
      return {
        title: '源组件',
      }
    },
  }
</script>

