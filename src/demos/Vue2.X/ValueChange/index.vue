<template lang="pug">
  .demo-vue-value-change
    group(title="value和on-change")
    group(title="demo1: v-model 绑定默认值空字符串")
      checklist(v-model="checkValue" :options="checkOpt")
    group(title="demo2: 绑定value: 值")
      checklist(:value="formatVal(checkValue1)" @on-change="changeVal" :options="checkOpt")
</template>

<script>
  import { Group, Checklist } from 'vux'

  export default {
    name: 'vue-value-change',
    components: {
      Group, Checklist,
    },
    methods: {
      formatVal(val) {
        if (val === '' || typeof val === 'undefined') {
          return []
        }
        return val;
      },
      changeVal(val) {
        this.checkValue1 = val
      },
    },
    created() {
      this.checkValue = []
      // this.checkValue = ''  // 插件报错， 值的类型对不上;
      this.checkValue1 = ''
    },
    data() {
      return {
        checkValue: undefined,
        checkValue1: undefined,
        checkOpt: [
          { key: 1, value: '值1' },
          { key: 2, value: '值2' },
          { key: 3, value: '值3' },
        ],
      }
    },
  }
</script>

