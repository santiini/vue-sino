<template>
  <div class="demos-create-element">
    <group title="create-element-demo1">
      <cell title="demos"></cell>
    </group>
    <group title="demos">
      <demo1 />
      <demo2 />
      <demo3
        name="demo3-name"
        :age="18"
        :list="[1,2,3,4,5]"
      />
    </group>
  </div>
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  import { Demo1, Demo2, Demo3 } from './demo1'

  export default {
    name: 'demos-create-element-index',
    components: {
      Group, Cell, XButton, Demo1, Demo2, Demo3,
    },
  }
</script>

<style>
  .demo2-class {
    color: red;
    padding: 5px 10px;
  }
</style>

