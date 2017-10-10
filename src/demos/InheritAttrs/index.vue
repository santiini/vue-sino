<template lang="pug">
  .demo-inherit-attrs
    child-demo1(v-bind:foo="foo" :boo="boo" :coo="coo" :doo="doo")
</template>

<script>
  import ChildDemo1 from './Child1.vue'

  export default {
    name: 'inheritAttrs',
    components: {
      ChildDemo1,
    },
    data() {
      return {
        foo: 'Hello, Child111',
        boo: 'Hello, Child222',
        coo: 'Hello, Child333',
        doo: 'Hello, Child444',
      }
    },
  }
</script>

<style lang="stylus">
  .demo-inherit-attrs
    padding 10px
    h4
      margin-top 20px
</style>
