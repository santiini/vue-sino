<template lang="pug">
  .demo-css-study-list
    group(title="css-study-list")
      cell(title="table" :link={ name: 'css-table'})
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'css-list',
    components: {
      Group, Cell,
    },
  }
</script>

