<template lang="pug">
  .demo-vue-sync-test
    group(title="sync的子组件")
      cell(title="姓名") {{name}}
      <x-input title="别名" v-model="currentValue" @on-change="onInput"></x-input>
      x-button(@click.native="changeName") 改名name
</template>

<script>
  import { Group, XButton, XInput, Cell } from 'vux'

  export default {
    name: 'demo-vue-sync-child',
    props: {
      name: String,
    },
    methods: {
      changeName() {
        // tips: async 需要在子组件的内部实现方法: update:prop
        this.$emit('update:name', 'santiiny')
      },
      onInput(val) {
        this.$emit('update:name', val)
      },
    },
    components: {
      Group, XInput, Cell, XButton,
    },
    data() {
      return {
        currentValue: '',
      }
    },
  }
</script>

