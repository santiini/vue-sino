tem<template>
  <div class="demos-jsx-index">
    <group title="demos-jsx-index">
      <cell title="demos"></cell>
    </group>
    <group title="demos">
      <demo1 />
      <demo2 />
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  import { Demo1, Demo2 } from './demo1'

  export default {
    name: 'demos-jsx-index',
    components: {
      Group, Cell, XButton, Demo1, Demo2,
    },
  }
</script>

<style>
  .demo2-class {
    color: red;
    padding: 5px 10px;
  }
</style>

