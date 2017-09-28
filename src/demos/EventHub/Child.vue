<template>
  <div class="">
    <group title="选择单位">
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
        this.$root.eventHub.$emit('selectDep', item)
        this.$router.go(-1)
      },
    },
    data() {
      return {
        departmentList: [
          { name: '单位1111', id: 111 },
          { name: '单位2222', id: 222 },
          { name: '单位3333', id: 333 },
          { name: '单位4444', id: 444 },
          { name: '单位5555', id: 555 },
          { name: '单位6666', id: 666 },
        ],
      }
    },
  }
</script>

<style lang="stylus">

</style>

