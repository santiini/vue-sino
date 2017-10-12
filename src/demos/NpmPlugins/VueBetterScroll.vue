<template lang="pug">
  .demo-npm-plugins__betterscroller
    vue-better-scroller.wrapper(ref="scroller" :scrollbar="{ fade: true }" :data="list"
      :startY="0"
      :pullUpLoad="{ threshold: 0, text: { more: '更多加载', noMore: '没有了' } }"
      @pullingUp="getList")
      .content
        group(gutter="0")
          cell(v-for="(item,i) of list" :key="i" :title="item")
</template>

<script>
  // tips: vue-better-scroll的更多细节请查看:https://github.com/santiini/vue-better-scroller/tree/v2
  import { Group, Cell } from 'vux'

  export default {
    name: 'plugins-vue-better-scroller',
    components: {
      Group, Cell,
    },
    methods: {
      getList() {
        if (this.list.length > 55) {
          console.log('没有更多')
          return this.$refs.scroller.forceUpdate()
        }
        console.log('加载..')
        this.list = this.list.concat(this.data)
      },
    },
    created() {
      this.getList()
    },
    data() {
      return {
        list: [],
        data: [111, 222, 333, 444, 555, 666, 777, 888, 999, 1010, 1111, 1212],
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .wrapper
    top 46px
  .content
    .weui-cell
      padding 15px
</style>


