<template lang="pug">
  .demo-npm-plugins__betterscroller
    better-scroll.wrapper(ref="scroller" :scrollbar="{ fade: true }" :data="list"
      :startY="0"
      :pullUpLoad="{ threshold: 0, text: { more: '更多加载', noMore: '没有了' } }"
      @pullingUp="getMore")
      .content
        group(gutter="0")
          cell(v-for="(item,i) of list" :key="i" :title="item")
</template>

<script>
  // tips: vue-better-scroll的更多细节请查看:https://github.com/santiini/vue-better-scroller/tree/v2
  import { Group, Cell } from 'vux'
  import BetterScroll from '@/components/BetterScroll'

  export default {
    name: 'plugins-better-scroller',
    components: {
      Group, Cell, BetterScroll,
    },
    methods: {
      // demo1: better-scroll测试, 数据很多时的终结
      getList() {
        if (this.list.length > 55) {
          console.log('没有更多')
          return this.$refs.scroller.forceUpdate()
        }
        console.log('加载..')
        this.list = this.list.concat(this.data)
      },
      // demo2: list数据不够一页时, 不能充满屏幕;
      getLessData() {
        const result = this.data.slice(0, 6)
        if (this.list.length < this.pageSize) {
          this.$refs.scroller.pullUpDirty = false
        }
        this.list = result
      },
      // demo3: 只有一页数据，但是可以撑满屏幕;
      getOnePage() {
        console.log('加载中...')
        const result = this.page === 1 ? this.data.slice(0) : []
        if (this.list.length < this.pageSize) {
          this.$refs.scroller.pullUpDirty = false
        }
        this.list = this.list.concat(result)
        this.page += 1
        if (result.length < this.pageSize) {
          return this.$refs.scroller.forceUpdate()
        }
      },
      // demo4:很多数据时
      getMore() {
        console.log('加载中...')
        const result = this.page > 3 ? [] : this.data.slice(0)
        this.list = this.list.concat(result)
        this.page += 1
        if (result.length < this.pageSize) {
          console.log('加载完毕')
          return this.$refs.scroller.forceUpdate()
        }
      },
    },
    // created() {  // created()钩子会出现部分组件没有挂载的情况;
    mounted() {
      // this.getList()
      // this.getLessData()
      // this.getOnePage()
      this.getMore()
    },
    data() {
      return {
        list: [],
        data: [111, 222, 333, 444, 555, 666, 777, 888, 999, 1010, 1111, 1212],
        page: 1,
        pageSize: 12,
      }
    },
  }
</script>

<style lang="stylus" scoped>
  .wrapper
    top 46px
  .content
    .weui-cell
      padding 25px
</style>
