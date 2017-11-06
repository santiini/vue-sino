<template lang="pug">
  .demo-v-for
    group(title="vue中 v-for 和 v-if")
    group(title="demo1: template上的v-for")
      template(v-for="(item,i) of list")
        cell(:key="i" :title="item" v-if="item % 2 === 0")
    group(title="demo2: cell上的v-for")
      cell(v-for="(item,i) of list" :key="i" :title="item" v-if="item % 2 === 0")
    group(title="demo3: v-if中的v-for")
      cell(v-for="(item,i) of list1" :key="i" :title="item.name")
        //- v-for 的优先级高于 v-if, 所以：当需要先判断 v-if 时, 需要把 v-if 提升到父级元素或者用 template 包裹中
        .cell-inline-desc(slot="inline-desc" v-if="item.list")
          .list(v-for="(child,k) of item.list" :key="k") {{child}}
    .btn-group
      x-button(@click.native="test1") demo1-v-for
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  export default {
    name: 'es6-array-demo',
    components: {
      Group, Cell, XButton,
    },
    methods: {
      test1() {

      },
    },
    data() {
      return {
        list: [111, 222, 333, 444, 555, 666, 777, 888, 999],
        list1: [
          { list: [1, 2], name: 'title1' },
          { name: 'title11' },
          { list: [11, 22], name: 'title2' },
          { name: 'title22' },
          { name: 'title222' },
          { list: [111, 222], name: 'title3' },
          { name: 'title33' },
        ],
      }
    },
  }
</script>

