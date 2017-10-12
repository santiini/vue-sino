<template lang="pug">
  .demo-npm-plugins
    group(title="vue-masonry: 瀑布流插件")
      cell(title="vue-masonry" :link="{ name: 'vue-masonry' }")
      cell(title="scroll-masonry" :link="{ name: 'scroll-masonry' }")
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'demo-npm-plugins',
    components: {
      Group, Cell,
    },
  }
</script>

