<template lang="pug">
  .demo-vue-ref
    group(title="ref的使用" class="list")
      .list-container
        //- test1
        //- 列表中的元素： 使用同一个 ref， 最终形成一个 ref 数组;
        .list-item(v-for="i in 10" :key="i" ref="item") {{i}}
        //- test3
        //- 列表中的元素： 使用不同的 ref, 分别指向某一个 ref 对象
        //- .list-item(v-for="j in 5" :key="j" :ref="`child${j}`") {{`child${j}`}}
        .list-item(v-for="j in 5" :key="j" :ref="'child' + j") {{`child${j}`}}
    group(title="ref的使用2")
      //- test2
      cell(v-for="i in 10" :title="`测试列表:${i}`" :key="i") {{i}}
        //- 这里的 ref 报错说明：ref 并非是到处可用的，非列表中的ref, 唯一，不可重用
        //- div(ref="demo2" slot="inline-desc" ref="inline-desc") 测试内容
        div(slot="inline-desc" :ref="`inline${i}`") 测试内容
        //- div(ref="inline" slot="inline-desc") 测试内容{{i}}
    //- test4
    group(title="不同元素使用相同的ref")
      cell(title="测试1")
        div(slot="value" ref="noRelated") value部分
      cell(title="测试2")
        div(slot="inline-desc" ref="noRelated") inline-desc部分
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'vue-ref',
    components: {
      Group, Cell,
    },
    methods: {
      // 简单测试 -- 列表中的 item 使用同一个ref
      test1() {
        // 对于
        console.log(this.$refs.item)
        this.$nextTick(() => {
          console.log(this.$refs.item) // [...] 数组形式的
          console.log(Object.prototype.toString.call(this.$refs.item))
          console.log(this.$refs.item[0]) // 指向数组第一个元素
        })
      },
      // 结构复杂 -- 非并列列表中， v-for 中非同级结构的 ref, 表现一样
      test2() {
        // test2--1 : 使用同一个 ref
        // console.log(Object.prototype.toString.call(this.$refs.inline))
        // console.log(this.$refs.inline)
        // console.log(this.$refs.inline[0])
        // console.log(this.$refs.inline[1])

        // test2 -2: 使用不同的ref
        console.log(this.$refs.inline1)
        console.log(this.$refs.inline2)
      },
      // 列表中的 item 使用不同的 ref
      test3() {
        console.log(Object.prototype.toString.call(this.$refs.child1))
        console.log(this.$refs.child1)
        console.log(this.$refs.child2)
        console.log(this.$refs.child2[0])
      },
      // 使两个不相干元素指向同一个 ref
      test4() {
        // tips: 最后一个 ref 指向会覆盖掉之前的 ref 指向， 不会报错...
        console.log(this.$refs.noRelated)
      },
    },
    created() {
      // 在 created 钩子中， 需要 $nextTick;
      // 在 mounted 钩子中， 则不需要;
      // this.test1() // 简单测试1
      // this.test2()
    },
    mounted() {
      // this.test2()
      this.test3()
      // this.test4()
    },
  }
</script>

<style lang="stylus" scoped>
  .list
    &-container
      padding 10px
    &-item
      padding 3px
</style>
