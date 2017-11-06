<template lang="pug">
  .demo-npm-plugins
    group(title="npm插件的学习")
      cell(title="vue-better-scroll" :link="{ path: '/demos/npm-plugins/vue-better-scroll' }")
      cell(title="better-scroll" :link="{ path: '/demos/npm-plugins/better-scroll' }")
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

