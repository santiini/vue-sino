<template lang="pug">
  .demo-point-events
    group(title="css3特性point-events的使用")
      cell(title="1.控制特定的图形元素在何时成为鼠标事件的 target")
      cell(title="2.none值指定元素不成为鼠标事件的目标")
      cell(title="3.none值还指示鼠标事件穿过该元素，并指向位于元素下面的元素。" :link="{ name: 'none2'}")
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    components: {
      Group, Cell,
    },
  }
</script>
