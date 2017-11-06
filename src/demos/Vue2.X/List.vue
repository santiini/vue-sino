<template lang="pug">
  .demo-vue-api-list
    group(title="vue-api-2.X")
      cell( v-for="(item,i) of VueApi" v-if="!item.isHome" is-link
        :title="item.name" :key="i" @click.native="goDemo(item)")
</template>

<script>
  import { Group, Cell } from 'vux'
  import { VueApi } from '@/data'

  export default {
    name: 'demo-vue-api-list',
    components: {
      Group, Cell,
    },
    methods: {
      goDemo(item) {
        if (item.isHome) return
        const path = item.path || `/vue/api/2.X/${item.name}`
        this.$router.push(path)
      },
    },
    data() {
      return {
        VueApi,
      }
    },
  }
</script>

