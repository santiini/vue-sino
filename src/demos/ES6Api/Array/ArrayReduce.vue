<template lang="pug">
  .demo-es6-array-reduce
    group(title="es6-array-reduce")
      .btn-group
        x-button(@click.native="test1") demo1-返回对象
        x-button(@click.native="test2") demo2-空数组的遍历 -- 无效
        x-button(@click.native="test3") demo2-空数组的遍历 -- 有效
        x-button(@click.native="test4") demo2-Array(...{length:3})
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
        const arr = [11, 22, 33, 44, 55]
        // reduce 返回一个对象，遍历过程中处理对象逻辑
        const arrObj = arr.reduce((pre, cur) => {
          if (cur > 0) {
            pre.total += cur
          }
          return pre
        }, { total: 0 })
        console.log(arrObj)
      },
      test2() {
        // tips: 空数组， 即使改变长度仍然无法有效遍历
        const arr = new Array(3);
        // const arr = [];
        const data = { start: '168', colspan: '3' }
        // arr.length = Number(data.colspan)
        const result = arr.reduce((prev, cur, i) => {
        // const result = new Array(Number(data.colspan)).reduce((prev, cur, i) => {
          console.log(i)
          const num = Number(data.start) + i
          prev.push(num)
          return prev
        }, [])
        console.log(result)
        console.log(arr)
        console.log(arr.length)
        arr.forEach((el, i) => {
          console.log(el)
          console.log(i)
        })
      },
      test3() {
        const data = { start: '168', colspan: '3' }
        const arr = Array(...{ length: Number(data.colspan) }).reduce((prev, cur, i) => {
        // const arr = Array(...{ length: Number(data.colspan) }).reduce((prev, cur, i) => {
        // const arr = Array.apply(null, { length: Number(data.colspan) }).reduce((prev, cur, i) => {
          console.log(i)
          prev.push(Number(data.start) + i);
          return prev;
        }, [])
        console.log(arr)
      },
      test4() {
        const arr1 = Array(...{ length: 5 })
        const arr2 = Array(5)
        const arr3 = Array(...{ length: '3' })
        console.log(arr1)  // [undefined]
        console.log(arr2)   // (empty)
        console.log(arr3)
      },
    },
  }
</script>

