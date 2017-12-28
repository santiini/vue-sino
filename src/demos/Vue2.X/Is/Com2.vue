<template lang="pug">
  .demo-vue-extends
    group(:title="title")
      cell(title="组件222")
      cell(:title="`组件2：prop-name:${name}`")
    group(title="props-list")
      cell(
        v-for="(item,i) of list"
        :key="i"
        :title="item.name"
        :inline-desc="item.id"
        @click.native="$emit('clickCell', item.name)"
      )
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  export default {
    name: 'demos-vue2-is-component2',
    components: {
      Group, Cell, XButton,
    },
    props: {
      name: String,
      list: Array,
    },
    methods: {

    },
    create() {
      console.log('组件222的created');
    },
    data() {
      return {
        title: '组件222',
      }
    },
  }
</script>

