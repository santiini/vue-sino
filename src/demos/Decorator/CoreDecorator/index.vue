<template lang="pug">
  .demo-core-decorator
    group(title="第三方模块：core-decorator")
      .btn-group
        x-button(@click.native="test1") demo1-autobind
        x-button(@click.native="test2") demo2-readyonly
        x-button(@click.native="test3") demo3-overrite
        x-button(@click.native="test4") demo4-deprecate
</template>

<script>
  import { Group, Cell, XButton } from 'vux'
  import { Person, Meal, Child1, Child2 } from './demo1'

  export default {
    name: 'core-decorator',
    components: {
      Group, Cell, XButton,
    },
    methods: {
      // demo1-autobind
      test1() {
        const person = new Person();
        const getPerson = person.getPerson();

        console.log('获取到实例自身')
        console.log(getPerson === person);
      },
      // demo2-readyonly
      test2() {
        const demo2 = new Meal();
        console.log(demo2.name)
        console.log(demo2.title)
        demo2.name = 'sunxt'
        console.log(demo2.name)
        demo2.title = 'new title' // 会报错
        console.log(demo2.title)
      },
      // demo3-overrite
      test3() {
        const child1 = new Child1()
        const child2 = new Child2()
        child1.speak()
        child2.speak()
      },
      // demo4-deprecate
      test4() {
        const demo4 = new Person()
        console.log(demo4.getPerson())
        demo4.disCardedMethod1()
        demo4.disCardedMethod2()
        demo4.disCardedMethod3()
      },
    },
  }
</script>


