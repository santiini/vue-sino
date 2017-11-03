<template lang="pug">
  .home
    group
     x-button(@click.native="printProps") 实例属性 和 静态属性
     x-button(@click.native="executeMethods") 执行实例方法和静态方法
     x-button(@click.native="changeProps") 改变实例属性 : OK
     x-button(@click.native="changeStaticProps") 改变class 的静态属性 : OK
     x-button(@click.native="printConstProps") 不可变更属性 -- 实例属性
     x-button(@click.native="printStaticConst") 不可变更属性 -- 静态属性
     x-button(@click.native="testProps") 静态属性和实例属性的关联
     x-button(@click.native="testChangeProps") 改变实例属性 --setter和 getter
     x-button(@click.native="testClass") 测试与总结
</template>

<script>
  /* eslint-disable */
  import { XHeader, Cell, Group, Grid, GridItem, XButton } from 'vux';
  // airbnb: import之后如果不是import, 必须空一行：
  import Democlass from './demo-class'

  export default {
    name: 'home',
    components: {
      XHeader, Cell, Group, Grid, GridItem, XButton,
    },
    methods: {
      // 打印实例属性和静态属性;
      printProps() {
        // 实例属性 和 静态属性;
        console.log(`实例属性：${this.demo.title}`)
        console.log(`原型上的实例属性：${Democlass.title}`)
        console.log(`传入的实例属性：${this.demo.phone}`)
        console.log(`实例上的静态属性：${this.demo.email}`)
        console.log(`静态属性: ${Democlass.email}`)

        console.log(Democlass.extraProps)
      },
      // 执行实例方法和静态方法;
      executeMethods() {
        // 实例方法 和 静态方法;
        this.demo.sayHi('实例方法')
        Democlass.say()
      },
      //  改变实例属性  --- 可以变更;
      changeProps() {
        console.log(`改前：${this.demo.title}`)
        this.demo.changTitle('改变后的title')
        console.log(`改后：${this.demo.title}`)
      },
      // 改变class 的静态属性 -- 可以变更;
      changeStaticProps() {
        console.log(`改前：${Democlass.email}`)
        Democlass.email = '新的邮箱'
        console.log(`改后：${Democlass.email}`)
      },
      // 不可变更属性 -- 实例属性;
      printConstProps() {
        console.log(`改前：${this.demo.type}`)
        this.demo.changeType('新的type')
        console.log(`改后：${this.demo.type}`)
      },
      // 不可变属性 -- 静态属性
      printStaticConst() {
        console.log(`${Democlass.fixedType}`)
        Democlass.fixedType = '新的static属性'
        console.log(`${Democlass.fixedType}`)
      },
      // 改变实例属性 --setter和 getter
      testChangeProps() {
        console.log(`改前props1: ${this.demo.props1}`)
        this.demo.props1 = 17
        console.log(`改前props1: ${this.demo.props1}`)
      },
      // 静态属性和实例属性的关联;
      testProps() {
        console.log(`改前：${Democlass.staticProp1}`)
        Democlass.staticProp1 = '改变下的测试'
        console.log(`改后：${Democlass.staticProp1}`)
      },
      testClass() {
        // 类的静态方法： 访问的属性测试
        // Democlass.staticMethod()
        // 实例的方法， 访问到的属性测试
          this.demo.instanceMethod()
      },
    },
    created() {
      this.demo = new Democlass('18500102459', 28)
      this.$store.dispatch('setHeader', { title: 'es6-class'})
    },
    data() {
      return {
        boxes: [
          // { name: '移动巡检', id: 3 },
          // { name: '移动巡检', id: 4 },
          // { name: '设备轮巡', id: 5 },
          // { name: '移动巡检', id: 6 },
        ],
        demo: undefined, // 测试class的实例;
      };
    },
  };
</script>

<style lang="stylus" scoped>

</style>

