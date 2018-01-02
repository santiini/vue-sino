<template lang="pug">
  .demo-vue-scope-slots-demo52
    group(title="scope的Vue模板测试")
      cell(title="slot-scope的使用")
      slot(name="name" :slotName="name")
      slot(name="title")
        cell(title="默认slot: title")
      slot(name="item" v-for="(item,i) of list" :item="item")
        cell(:title="item.name" :key="i")
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'demo-vue-scope-slots-demo52',
    components: {
      Group, Cell,
    },
    props: {
      list: Array,
      name: String,
    },
  }
</script>

