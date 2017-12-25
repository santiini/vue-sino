<template lang="pug">
  .demo-npm-plugins__betterscroller
    better-scroll.wrapper(ref="scroller" :scrollbar="{ fade: true }" :data="list"
      :startY="0"
      :pullDownRefresh="{threshold: 90, stop: 40 }"
      :pullUpLoad="{ threshold: 0, text: { more: '更多加载', noMore: '没有了' } }"
      @pullingDown="refreshScroller"
      @pullingUp="pullupLoad")
      div.content
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
      // 初始化页面，重置scroller, 状态小调整;
      initScroller() {
        if (this.$refs.scroller) {
          console.log('已经存在时，刷新')
          this.$refs.scroller.pullUpDirty = true  // 上拉加载文字的初始化
          this.$refs.scroller.isPullUpLoad = true // 控制上拉文字和 loading 的切换显示
        }
        return this.pullupLoad()
      },
      // 下拉刷新
      refreshScroller() {
        this.page = 1
        // this.$refs.scroller.pullUpDirty = true  // 上拉加载文字的初始化
        return this.pullupLoad()
      },
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
        this.$nextTick(() => {
          console.log(this.$refs.scroller)
          console.log(this.$refs.scroller.scrollObj)
        })
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
      // demo5: 下拉加载
      pullupLoad1() {
        console.log('pullup load...')
        setTimeout(() => {
          const result = this.page > 5 ? [] : this.data.slice(0)
          // tips: 不在这里进行，移动 router hook 中;
          console.log(this.page)
          if (this.page === 1) {
            this.list = []
          }
          if (result.length > 0) {
            this.page += 1
            this.list = this.list.concat(result)
          } else {
            this.$refs.scroller.forceUpdate()
          }
        }, 1500)
        // 当请求完成时间很短时，即很快就进入数据滚动处理时，
        // 假如用户有拖动行为，导致出现顿卡，回弹
        // }, 300)
      },
      pullupLoad() {
        setTimeout(() => {
          const result = this.page > 5 ? [] : this.data.slice(0)
          // const result = this.data.slice(0, 6)
          // const result = Date.now() % 2 > 0 ? result1 : result2

          // 1. 第一页， 初始化 list
          if (this.page === 1) {
            this.list = []
          }
          // 2. 数据结合
          this.list = this.list.concat(result)
          // 3. 没有更多的情况：返回空数组 [] or 数据只有一页
          if (result.length < 1 || (this.page === 1 && result.length < 12)) {
            this.$refs.scroller.forceUpdate()
          }
          // 4. 有数据，就 page + 1, 下次请求下一页;
          if (result.length > 0) {
            this.page += 1
          }
        }, 1300)
      },
    },
    // created() {  // created()钩子会出现部分组件没有挂载的情况;
    // mounted() {
    beforeRouteLeave(to, from, next) {
      // tips: scroller 的 data 属性只要变化，就会触发 forceUpdate(true) 改变 scroller状态,;
      // 在离开路由时，初始化 list
      this.list = []
      this.page = 1;
      next()
    },
    activated() {
      console.log('keep-alive')
      // this.getList()
      // this.getLessData()
      // this.getOnePage()
      // this.getMore()
      // this.pullupLoad()

      this.initScroller() // 测试loading
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
    // height: 100%;
  .content
    // height: 100%;
    // min-height: calc(100% + 2px)
    // 内容高度高度滚动高度，是它可滚动
    // min-height: 623px;
    .weui-cell
      padding 25px
</style>
<style >
  .wrapper .scroll-content {
    /* height: 100%; */
  }
  .pulldown-wrapper {
    top: -100px;
  }
</style>

