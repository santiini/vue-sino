<template lang="pug">
  .demo-es6-api-list
    group(title="es6-api-list")
      cell(title="array" :link={ name: 'es6-array-demos'})
      cell(title="decorator-装饰器" :link="{ name: 'es6-decorator'}")
      cell(title="proxy-代理" :link="{ name: 'es6-proxy'}")
      cell(title="Reflect" :link="{ name: 'es6-reflect'}")
      cell(title="Symbol" :link="{ name: 'es6-symbol'}")
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'es6-list',
    components: {
      Group, Cell,
    },
  }
</script>

