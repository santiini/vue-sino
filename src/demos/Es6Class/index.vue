<template lang="pug">
  .es6-class
    group(:title="classTitle")
      x-button(@click.native="changeTitle") 改变title
</template>

<script>
import { Group, Cell, XButton } from 'vux'
import { DemoClass } from './class'

export default {
  components: {
    Group, Cell, XButton,
  },
  methods: {
    changeTitle() {
      this.$store.dispatch('setHeader', { title: 'newclass1' })
      // console.log(DemoClass.headerName)
      this.classTitle = DemoClass.headerName
      console.log(DemoClass.isOdd())
    },
  },
  created() {
    this.$store.dispatch('setHeader', { title: 'es6-class2' })
    console.log(DemoClass.headerName)
    console.log(DemoClass.isOdd())
    this.classTitle = DemoClass.headerName
  },
  data() {
    return {
      classTitle: '',
    }
  },
}
</script>


<style lang="stylus" scoped>

</style>
