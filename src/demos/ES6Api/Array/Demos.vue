<template lang="pug">
  .demo-es6-array
    group(title="es6-array-demos")
      cell(title="map" :link="{ name: 'es6-array-map'}")
      cell(title="array-list" :link="{ name: 'es6-array-array-list'}")
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  export default {
    name: 'es6-array-demos-list',
    components: {
      Group, Cell, XButton,
    },
    methods: {
      test1() {

      },
    },
  }
</script>

