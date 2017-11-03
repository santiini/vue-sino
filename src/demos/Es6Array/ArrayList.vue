<template lang="pug">
  .demo-es6-array
    group(title="es6-array")
      cell(title="reduce" :link="{ name: 'array-reduce'}")
    group(title="demos")
      .btn-group
        x-button(@click.native="test1") demo2-空数组的遍历
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
  }
</script>

