<template>
  <group title="eventHub测试">
    <x-input title="姓名" v-model="name"></x-input>
    <!-- <selector
      v-model="type"
    ></selector> -->
    <cell title="单位" :link="{ path: '/demos/event-hub/child' }" :value="departName"></cell>
    <cell title="时间" value="20170727"></cell>
    <cell title="$vux.bus/$sino.bus" :link="{ path: '/demos/event-hub/bus' }" :value="testValue"></cell>
  </group>
</template>

<script>
  import { Group, XInput, Selector, Cell } from 'vux'

  export default {
    name: 'event-hub',
    components: {
      Group, XInput, Selector, Cell,
    },
    methods: {
      // onSelectDep(department) {
      //   console.log(department)
      //   this.departName = department.name
      // },
      onTestEventHub(item) {
        console.log(item)
        this.testValue = item.name
      },
    },
    // 如果不摧毁$off取消绑定，会触发多次事件
    created() {
      // tips: 监听事件后，需要缓存当前组件，否则会摧毁组件，事件监听失败;
      // 基于根组件 vm.$root上 eventHub.vue的监听
      console.log('组件创建')
      // this.$root.eventHub.$on('selectDep', this.onSelectDep)
      // 形式1：eventHub
      this.$root.eventHub.$on('selectDep', (department) => {
        console.log(department)
        this.departName = department.name
      })
      // 形式2: $vux.bus
      // this.$vux && this.$vux.bus && this.$vux.bus.$on('testEventHub', this.onTestEventHub)
      // 形式3：$vux.sino
      this.$sino && this.$sino.bus && this.$sino.bus.$on('testEventHub', this.onTestEventHub)
    },
    destroy() {
      this.$root.eventHub.$off('selectDep', this.onSelectDep)
      this.$sino && this.$sino.bus && this.$sino.bus.$off('testEventHub', this.onTestEventHub)
    },
    data() {
      return {
        name: 'name111',
        type: '',
        typeList: [1, 2, 3, 4],
        departName: '',
        testValue: '',
      }
    },
  }
</script>

<style lang="stylus">

</style>

