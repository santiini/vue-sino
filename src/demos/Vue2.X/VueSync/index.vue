<template lang="pug">
  .demo-vue-sync
    group(title="sync测试")
      cell(title="name") {{testName}}
    //- sync 实现双向绑定： 需要子组件内部实现：$emit('update:prop', ..arg)
    child(:name.sync="testName")
</template>

<script>
  import { Group, XButton, Cell } from 'vux'
  import Child from './Demo'

  export default {
    name: 'demo-vue-sync',
    components: {
      Group, Child, XButton, Cell,
    },
    methods: {
    },
    data() {
      return {
        testName: 'xiaoT',
      }
    },
  }
</script>
