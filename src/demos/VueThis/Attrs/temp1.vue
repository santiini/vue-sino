<template>
  <div class="demo-vue-this-attrs-type1">
    <group title="template模板: temp1">
      <cell :title="`temp: ${$attrs.sex}`" />
      <cell :title="`temp: ${$attrs.age}`" />
      <cell :title="`temp: ${$attrs.desc}`" />
    </group>
    <temp2 v-bind="$attrs" />
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'

  import Temp2 from './temp2'

  export default {
    name: 'demo-vue-this-attr-temp1',
    components: {
      Group, Cell, Temp2,
    },
  }
</script>

