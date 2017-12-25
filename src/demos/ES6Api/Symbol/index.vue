<template lang="pug">
  .demo-es6-api-symbol
    group(title="Symbol")
      x-button(@click.native="createFunc") demo1 createFunc
      x-button(@click.native="testFunc2") demo2 testFunc2
      x-button(@click.native="testFunc3") demo3 testFunc3
      x-button(@click.native="testFunc4") demo4 testFunc4
      x-button(@click.native="forFunc") demo5 forFunc
      x-button(@click.native="testFunc5") demo6 testFunc5
      x-button(@click.native="testFunc6") demo7 testFunc6
    group(title="内置的Symbol")
      x-button(@click.native="demoFunc1") demo7 demoFunc1
      x-button(@click.native="demoFunc2") demo8 demoFunc2
</template>

<script>
  import { Group, XButton } from 'vux'
  import {
    createFunc, testFunc2, testFunc3, testFunc4, forFunc, testFunc5, testFunc6, demoFunc1, demoFunc2,
  } from './index'

  export default {
    name: 'demo-es6-symbol',
    components: {
      Group, XButton,
    },
    methods: {
      test1() {

      },
      test2() {

      },
      createFunc,
      testFunc2,
      testFunc3,
      testFunc4,
      forFunc,
      testFunc5,
      testFunc6,
      demoFunc1,
      demoFunc2,
    },
  }
</script>

