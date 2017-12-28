<template lang="pug">
  .demo-vue-extends
    group(:title="`props名称：${name}`")
    group(:title="`props类型：${type}`")
    group(:title="title")
      cell(v-for="(item,i) of list" :title="item" :key="i")
    group(title="改变数据")
      x-button(type="primary" @click.native="changeData") 改变数据
</template>

<script>
  import { Group, Cell, XButton } from 'vux'
  import Demo1, { getData } from './Extend1.js'

  // 数据源以及改变数据源的方法;
  const list = [1, 2, 3, 4];
  const getList = () => [1111, 2222, 3333, 4444];

  export default {
    name: 'demos-vue2-extends-component2',
    extends: getData(list, getList),
    // extends: Demo1,
    props: {
      name: String,
      type: Number,
    },
    components: {
      Group, Cell, XButton, Demo1,
    },
    methods: {

    },
    created() {
      console.log('demo的created');
      console.log(this.list)
    },
    data() {
      return {
        title: 'demo2:extends',
      }
    },
  }
</script>

