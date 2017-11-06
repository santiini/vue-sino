<template lang="pug">
  .demo-vue-v-model-demo
    group(title="child组件: v-model绑定checked")
      cell(title="value-props") {{value}}
      cell(title="checked-props") {{checked }}
    group(title="操作测试")
      x-button(@click.native="changeChecked") 改变Checked-子组件
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  export default {
    name: 'vue-v-model',
    // model 选项：默认情况下，v-model 会把 value 作为 prop, 把 input 作为 event,
    // 在 model 中，可以指定 prop 和 event;
    model: {
      prop: 'checked',
      event: 'change',
    },
    props: {
      // checked 作为 v-model 的prop, 替代 value
      checked: {
        type: Number,
        default: 0,
      },
      // value 可以作为正常的 prop 使用;
      value: String,
    },
    components: {
      Group, Cell, XButton,
    },
    methods: {
      changeChecked() {
        console.log('改变 checked 的值')
        // this.$emit('update:checked', 1111111111)
        this.num = this.num + 1
        this.$emit('change', this.num)
      },
    },
    data() {
      return {
        num: 1111111111,
      }
    },
  }
</script>

