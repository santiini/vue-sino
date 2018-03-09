<template lang="pug">
  .demo-vue-this-list
    group(title="vue的this对象的属性")
      cell(
        v-for="(item, i) of list"
        :key="item.name"
        v-if="!item.isHidden"
        :title="item.title || item.name"
      )
</template>

<script>
  import { Group, Cell } from 'vux'

  import menu from '../../data/menu'

  export default {
    name: 'demo-vue-this-list',
    components: {
      Group, Cell,
    },
    data() {
      const { list } = menu.find(item => item.name === 'vue-this')
      return {
        list,
      }
    },
  }
</script>

