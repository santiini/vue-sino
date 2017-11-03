<template lang="pug">
  .demo-vue-http
    group(title="vue-http库")
      cell(title="axios")
      cell(title="fly" :link="{ name: '/'}")
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'demo-vue-http',
    components: {
      Group, Cell,
    },
  }
</script>

<style lang="stylus" scoped>

</style>


