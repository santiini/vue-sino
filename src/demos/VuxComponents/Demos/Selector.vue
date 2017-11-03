<template lang="pug">
  .demo-vux-list
    group(title="selector demos")
      selector(placeholder="选择demo1" title="没有v-model" :options="list1")
      selector(placeholder="选择demo2" title="v-model" :options="list2" v-model="demoVal2")
      //- select 的 direction 布局方式: 1. ltr  2. rtl 3. inherit
      selector(placeholder="选择demo3" title="selector布局direction" direction="rtl" :options="list2" v-model="demoVal3")
</template>

<script>
  import { Group, Cell, Selector } from 'vux'

  export default {
    name: 'vux-list',
    components: {
      Group, Cell, Selector,
    },
    data() {
      return {
        list1: ['11', '22', '33', '44'],
        list2: [
          { key: 11, value: '小白' },
          { key: 12, value: '小黑' },
          { key: 13, value: '小黄' },
        ],
        demoVal1: '',
        demoVal2: '',
        demoVal3: '',
      }
    },
  }
</script>

