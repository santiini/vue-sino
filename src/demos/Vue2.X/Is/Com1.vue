<template lang="pug">
  .demo-vue-extends
    group(:title="title")
      cell(title="组件111")
      cell(:title="`组件1：prop-name:${name}`")
    group(title="list")
      cell(
        v-for="(item,i) of list"
        :key="i"
        :title="item"
        @click.native="$emit('clickCell', item)"
      )
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  export default {
    name: 'demos-vue2-is-component1',
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
      console.log('组件111的created');
    },
    data() {
      return {
        title: '组件111',
      }
    },
  }
</script>

