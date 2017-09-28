<template>
  <div class="">
    <group title="选择测试部门">
      <cell v-for="(item, i) of departmentList" :key="i" :title="item.name" @click.native="selectDep(item)"></cell>
    </group>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'event-child',
    components: {
      Group, Cell,
    },
    methods: {
      selectDep(item) {
        // 触发根组件 vm.$root.eventHub 对应的事件
        // this.$root.eventHub.$emit('selectDep', item)
        // console.log(this.$sino)
        // $sino.bus
        this.$sino && this.$sino.bus && this.$sino.bus.$emit('testEventHub', item)
        // $vux.bus
        // this.$vux && this.$vux.bus && this.$vux.bus.$emit('testEventHub', item)
        this.$router.go(-1)
      },
    },
    data() {
      return {
        departmentList: [
          { name: '部门1111', id: 111 },
          { name: '部门2222', id: 222 },
          { name: '部门3333', id: 333 },
          { name: '部门4444', id: 444 },
          { name: '部门5555', id: 555 },
          { name: '部门6666', id: 666 },
        ],
      }
    },
  }
</script>

<style lang="stylus">

</style>

