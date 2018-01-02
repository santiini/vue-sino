tem<template>
  <div class="demos-jsx-index">
    <group title="demos-jsx-index">
      <selector title="当前demo:" placeholder="选择demo" :options="demos" v-model="curDemo"></selector>
    </group>
    <group title="demos">
      <demo1 v-if="curDemo === 1" />
      <demo2 v-if="curDemo === 2" />
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XButton, Selector } from 'vux'

  import { Demo1, Demo2 } from './demo1'

  export default {
    name: 'demos-jsx-index',
    components: {
      Group, Cell, XButton, Demo1, Demo2, Selector,
    },
    data() {
      return {
        demos: [
          { value: 'html元素', key: 1 },
          { value: '组件', key: 2 },
        ],
        curDemo: 1,
      }
    },
  }
</script>

<style>
  .demo2-class {
    color: red;
    padding: 5px 10px;
  }
</style>

