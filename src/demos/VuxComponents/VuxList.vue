<template lang="pug">
  .demo-vux-list
    group(title="vux组件实践")
      cell(v-for="(demo, i) of vuxComponents" :key="i" :title="demo.name" @click.native="goDemo(demo)" is-link)
</template>

<script>
  import { Group, Cell } from 'vux'
  import { vuxComponents } from '@/data'

  export default {
    name: 'vux-list',
    components: {
      Group, Cell,
    },
    methods: {
      goDemo(demo) {
        const { name } = demo
        const path = demo.path || `/vux/component/${name}`
        this.$router.push(path)
      },
    },
    data() {
      return {
        vuxComponents,
      }
    },
  }
</script>

