<template>
  <div class="demo-vue-this listeners-tem">
    <group title="$listeners传递: temp">
      <selector title="选项" :options="[1, 2, 3, 4]" v-model="tempType" @on-change="changeSelector" />
      <datetime title="开始时间" />
    </group>
    <!-- tips: v-on="obj" 传递 $listeners 父组件的监听事件，全部传递到深层次的子组件中 -->
    <Temp1 v-on="$listeners" />
  </div>
</template>


<script>
  import { Group, Cell, XInput, Selector, Datetime } from 'vux'

  import Temp1 from './temp1'

  export default {
    name: 'demo-vue-this-listeners-temp',
    components: {
      Group, Cell, Temp1, XInput, Selector, Datetime,
    },
    methods: {
      changeSelector(val) {
        console.log(val)
        this.$emit('changeSelector', val)
      },
    },
    created() {
      // console.log(this)
      // console.log(this.$listeners)
    },
    data() {
      return {
        tempType: '',
      }
    },
  }
</script>
