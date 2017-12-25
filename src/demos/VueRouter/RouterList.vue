<template lang="pug">
  .demo-vue-router-list
    group(title="router-path-测试")
      cell(title="path:1" )
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'demo-vue-router-list',
    components: {
      Group, Cell,
    },
  }
</script>
