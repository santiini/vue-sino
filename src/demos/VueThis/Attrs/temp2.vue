<template>
  <div class="demo-vue-this-attrs-type1">
    <group title="template模板: temp2">
      <cell :title="`temp: ${$attrs.sex}`" />
      <cell :title="`temp: ${$attrs.age}`" />
      <cell :title="`temp: ${$attrs.desc}`" />
    </group>
  </div>
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'demo-vue-this-attr-temp2',
    components: {
      Group, Cell,
    },
  }
</script>

