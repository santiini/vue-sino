<template lang="pug">
  .demo-es6-proxy-list
    group(title="es6-proxy-list")
      x-button(@click.native="test1") demo1
      x-button(@click.native="test2") demo2
    group(title="proxy的13中拦截操作")
      x-button(@click.native="test3") demo1
      x-button(@click.native="test31") demo11
</template>

<script>
  /* eslint-disable new-cap,no-unused-vars */
  import { Group, Cell, XButton } from 'vux'
  import demo1 from './demo1'
  import demo2 from './demo2'
  import { personProxy, personProxy2, createArray, pipe } from './demo3'

  export default {
    name: 'es6-proxy-list',
    components: {
      Group, Cell, XButton,
    },
    methods: {
      test1() {
        // demo1 的所有属性都代理， 返回35
        console.log(demo1.age)
        console.log(demo1.name)
      },
      test2() {
        console.log(demo2(1, 2));
        console.log(new demo2(1, 2));
        console.log(demo2.prototype === Object.prototype)
        console.log(demo2.name)
        console.log(demo2.title)
      },
      // get(target, propKey, receiver)
      test3() {
        console.log(personProxy.name)
        console.log(personProxy2.name)
        // console.log(personProxy2.sex) // 报错
        const demo3 = createArray('11', '22', '33', '44')
        console.log(demo3[1])
        console.log(demo3[-1])
      },
      test31() {
        const double = n => n * 2;
        const pow = n => n * n;
        const reverseInt = n => n.toString().split('').reverse().join('');
        console.log(pipe(3).double.pow.reverseInt.get)
      },
    },
  }
</script>

