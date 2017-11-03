<template lang="pug">
  .demo-es6-decorator
    group(title="es6 的 decorator 用法")
      .btn-group
        x-button(@click.native="testDemo1" type="primary") demo1
        x-button(@click.native="testDemo2" type="primary") demo2
        x-button(@click.native="testDemo3") demo3
      .btn-box
        x-button(@click.native="testDemo41") demo4-1
        x-button(@click.native="testDemo42") demo4-2
      .btn-group
        x-button(@click.native="testDemo5") demo5
      .btn-box
        x-button(@click.native="testDemo6") demo6-1
        x-button(@click.native="testDemo62") demo6-2
      .btn-group
        x-button(@click.native="testDemo7") demo7
      .btn-box
        x-button(@click.native="testDemo8") demo8-派发 postal 事件
        x-button(@click.native="testDemo82") demo8-2-派发 postal 事件
      .btn-box
        x-button(@click.native="testDemo9") demo9-mixins
        x-button(@click.native="testDemo92") demo9-mixins-extend
        x-button(@click.native="testDemo93") demo9-mixins-extends
      .btn-box
        x-button(@click.native="testDemo10") traits-排除重名方法
        x-button(@click.native="testDemo102") traits-重命名重名方法
    group(title="第三方库：core-decorators")
      cell(title="demo演示" :link="{ name: 'core-decorator'}")
</template>

<script>
  /* eslint-disable */
  import { Group, Cell, XButton } from 'vux'
  import Demo1Class from './demo1'
  import Demo2Class from './demo2'
  import Demo3Class from './demo3'
  import Demo4Class from './demo4'
  import Demo5Class from './demo5'
  import Demo6Class from './demo6'
  import Demo7Class from './demo7'
  import Demo8Class from './demo8'
  import Demo9Class from './demo9'
  import { MyClass2, MyClass3 } from './demo9'
  import { MyClass1 as MyDemo1, MyClass2 as MyDemo2 } from './demo10'

  export default {
    name: 'es6-decorator',
    components: {
      Group, Cell, XButton,
    },
    methods: {
      // demo1: decorator 修饰 class 类自身，添加静态属性、方法
      testDemo1() {
        const demo1 = new Demo1Class();
        demo1.sayHi()
        console.log(demo1.name)  // 实例属性
        console.log(Demo1Class.title) // class 静态属性
        console.log(Demo1Class.testName) // decorator 修饰的静态属性
        Demo1Class.doubleNumber(5) // decorator 修饰的静态方法
      },
      // demo2: decorator 修饰 class 类的 prototype 原型，添加实例属性、方法
      testDemo2() {
        const demo2 = new Demo2Class();
        demo2.sayHi()
        console.log(demo2.name) // 实例属性
        console.log(demo2.age) // 实例没有的属性， 只有 class 类才有
        console.log(Demo2Class.age) // decorator 修修饰的静态属性
        console.log(Demo2Class.address) // decorator 修饰的静态属性
        console.log(Demo2Class.telphone) // decorator 修饰的静态属性
        console.log(demo2.info) // decorator 修饰的实例属性
      },
      // demo3: decorator 传入参数， 动态修饰 class or class.protorype
      testDemo3() {
        const demo3 = new Demo3Class();
        demo3.sayHi()
        console.log(demo3.name);
        console.log(demo3.age);
        console.log(demo3.hope);
        demo3.test1()
        demo3.test2()
        demo3.test3('我的想法')
      },
      // demo4: 方法的修饰器 修改属性的 writable 属性
        // 1. 不可修改的方法： name(), 利用修饰器
      testDemo41() {
        const demo4 = new Demo4Class()
        console.log(demo4.fullName)
        console.log(demo4.first)
        console.log(demo4.last)

        console.log(demo4.name())
        // 尝试修改 demo4.name 方法
        demo4.name = () => console.log('修改name方法')  // 会报错
        // demo4.name = 'test'
        console.log(demo4.name())
      },
        // 2. 可修改的方法： sayHi
      testDemo42() {
        const demo4 = new Demo4Class()
        console.log(demo4.sayHi())
        demo4.sayHi = () => {
          console.log('修改 sayHi 方法')
          return '修改后的 sayHi'
        }
        console.log(demo4.sayHi())
      },
      // demo3: 方法的修饰器 修改属性的 enumerable 属性
      testDemo5() {
        // tips: 这里 enumerable, 只适用于属性，方法不适用
        const demo5 = new Demo5Class()
        demo5.title = '测试enumerable'
        console.log(demo5.kidCount);
        console.log(demo5.address);
        console.log(Object.keys(demo5));
        console.log(Object.getOwnPropertyDescriptor(demo5, 'children'))
        // console.log(Object.getOwnPropertyDescriptor(demo5, 'sayHi')) // 这是方法
        console.log(Object.getOwnPropertyDescriptor(demo5, 'kidCount'))
        console.log(Object.getOwnPropertyDescriptor(demo5, 'address'))

        // 测试
        demo5.propertyIsEnumerable('children')
        demo5.propertyIsEnumerable('kidCount')
        demo5.propertyIsEnumerable('address')
        // for..in 和 Object.keys() 的区别：
        // 一个 for-in 循环还会枚举其原型链上的属性， Object.keys() 只会获取对象自己拥有的属性
        for (const key in demo5) {
          console.log(`可枚举属性: ${key}`)
        }
      },
      // demo6
        // es5 的实现
      testDemo6() {
        const demo6 = new Demo6Class()
        console.log(demo6.add(1,2))
      },
        // es6 的实现
      testDemo62() {
        const demo6 = new Demo6Class()
        console.log(demo6.square(5, 10))
      },
      // demo7: 多个 decorator
      testDemo7() {
        const demo7 = new Demo7Class()
        demo7.sayHi()
      },
      // demo8: postal 派发事件
      testDemo8() {
        const demo8 = new Demo8Class()
        demo8.someMethod()
        // demo8.sayHi()
      },
      // demo82: 可以深入研究.... ????
      testDemo82() {
        const demo8 = new Demo8Class()
        demo8.changeStatus()
      },
      // demo9: mixins
      testDemo9() {
        const demo9 = new Demo9Class()
        console.log(demo9.title)
        console.log(demo9.name)
        console.log(demo9.age)
        demo9.sayHi()
        demo9.testMethod1()
        demo9.testMethod2()
        demo9.testMethod3()
      },
      // demo92: 继承的mixin
      testDemo92() {
        const demo9 = new MyClass2()
        console.log(demo9.title) // baseClass
        console.log(demo9.firstName) // mixins
        console.log(demo9.lastName) // mixins
        console.log(demo9.name)
        console.log(demo9.header)
        demo9.sayHi()
        demo9.toMixin()
        demo9.sayName()
      },
      // demo93: 继承的mixin, 原型链上的方法调用
      testDemo93() {
        const demo9 = new MyClass3()
        demo9.sayHi()
      },
      // demo10: traits: traits-排除重名方法
      testDemo10() {
        const demo10 = new MyDemo1()
        demo10.sayHi()
        demo10.sayNme()
      },
      // demo102: traits-重命名重名方法
      testDemo102() {
        const demo10 = new MyDemo2()
        demo10.sayHi()
        demo10.sayName()
        demo10.sayHi2()
      },
    },
  }
</script>

<style lang="stylus" scoped>

</style>


