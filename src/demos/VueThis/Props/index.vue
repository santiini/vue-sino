<template lang="pug">
  .demo-vue-api-props
    group(title="$props的使用")
      demo1(title="姓名" placeholder="请输入姓名")
</template>

<script>
  import { Group, Cell } from 'vux'

  import Demo1 from './demo1'

  export default {
    name: 'vue-this-props-index',
    components: {
      Group, Cell, Demo1,
    },
  }
</script>
