<template>
  <div class="demo-vue-this listeners-tem">
    <group title="$listeners传递: temp1">
      <selector title="选项" :options="[1, 2, 3, 4]" v-model="temp1Type" @on-change="changeSeletor" />
      <datetime title="开始时间" />
    </group>
  </div>
</template>


<script>
  import { Group, Cell, XInput, Selector, Datetime } from 'vux'

  export default {
    name: 'demo-vue-this-listeners-temp',
    components: {
      Group, Cell, XInput, Selector, Datetime,
    },
    methods: {
      changeSeletor(val) {
        console.log(val)
        this.$emit('changeSelector', val)
      },
    },
    data() {
      return {
        temp1Type: '',
      }
    },
    created() {
      // 通过 template 模板传递, v-on="$listeners" 传递成功;
      // console.log(this)
      console.log(this.$listeners)
    },
  }
</script>
