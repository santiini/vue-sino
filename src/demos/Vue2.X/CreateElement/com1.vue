<template lang="pug">
  .demos-create-element-component1
    group(title="createElement创建组件")
      cell(title="组件1")
      <slot>默认slot为header</slot>
    group(title="组件props")
      cell(:title="`name: ${name}`")
      cell(:title="`age: ${age}`")
    group(title="list列表:")
      template(v-if="list && list.length > 0")
        cell(v-for="(item,i) of list" :key="i" :title="item" @click.native="checkCell(item,i)")
    <slot name="footer">默认footer</slot>
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'app-vue-create-element-component1',
    props: {
      name: String,
      age: Number,
      list: Array,
    },
    components: {
      Group, Cell,
    },
    methods: {
      checkCell(item, i) {
        this.$emit('check-cell', item, i)
      },
    },
  }
</script>
