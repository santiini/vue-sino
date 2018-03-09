<template>
  <div class="demo-vue-this-attrs-type1">
    <group title="template模板">
      <cell :title="`temp: ${$attrs.sex}`" />
      <cell :title="`temp: ${$attrs.age}`" />
      <cell :title="`temp: ${$attrs.desc}`" />
    </group>
    <temp1 v-bind="$attrs" />
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'

  import Temp1 from './temp1'

  export default {
    name: 'demo-vue-this-attr-temp',
    inheritAttrs: false,
    props: {
      name: String,
      title: String,
      list: Array,
    },
    components: {
      Group, Cell, Temp1,
    },
  }
</script>

