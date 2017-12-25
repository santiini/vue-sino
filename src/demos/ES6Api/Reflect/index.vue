<template lang="pug">
  .demo-es5-reflect
    group(title="es6-reflect")
     x-button(type="primary" @click.native="demoFunc1") demo1-测试
     x-button(type="primary" @click.native="demoFunc2") demo2-测试
     x-button(type="primary" @click.native="demoFunc3") demo3-测试
     x-button(type="primary" @click.native="demoFunc4") demo4-测试
</template>

<script>
  import { Group, XButton } from 'vux'
  import { demoFunc1, demoFunc2, demoFunc3, demoFunc4 } from './index'

  export default {
    name: 'demo-es6-reflect',
    components: {
      Group, XButton,
    },
    methods: {
      demoFunc1, demoFunc2, demoFunc3, demoFunc4,
    },
  }
</script>

