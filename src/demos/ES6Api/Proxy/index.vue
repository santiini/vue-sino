<template lang="pug">
  .demo-es6-proxy-list
    group(title="es6-proxy-list")
      x-button(@click.native="test1") demo1
      x-button(@click.native="test2") demo2
    group(title="proxy的13中拦截操作")
      x-button(@click.native="test3") demo3-createArray的负值索引
      x-button(@click.native="test31") demo11
      x-button(@click.native="test4") demo4-验证:age不能大于200
      x-button(@click.native="test5") demo5-禁止访问私有属性
      x-button(@click.native="test6") demo6-receiver指向问题
      x-button(@click.native="test7") demo7-apply简单拦截
      x-button(@click.native="test8") demo8-apply: twice
      x-button(@click.native="test9") demo9-has: key in obj
      x-button(@click.native="test10") demo10-construc func
      x-button(@click.native="test11") demo11- deleteProperty
      x-button(@click.native="defineFunc") demo12- defineProperty
      x-button(@click.native="getProtoFunc") demo13- getPrototypeOf
      x-button(@click.native="isExtensibleFunc") demo14- isExtensibleFunc
    group(title="demo15: ownKeys")
      .btn-box
        x-button(@click.native="keysFunc1") ownKeys1
        x-button(@click.native="keysFunc2") ownKeys2
      x-button(@click.native="revokeProxy") demo16- revokeProxy

</template>

<script>
  /* eslint-disable new-cap,no-unused-vars,no-underscore-dangle */
  import { Group, Cell, XButton } from 'vux'
  import demo1 from './demo1'
  import demo2 from './demo2'
  import { personProxy, personProxy2, createArray, pipe, testPipe } from './demo3'
  import { validator, person, proxyRole, Role, selfWrapper } from './demo4'
  import { getStrProxy, getStr, twice } from './demo5'
  import { privateProxy } from './demo6'
  import { funcProxy, delProxy, deleteFunc, defineFunc, getProtoFunc, isExtensibleFunc, keysFunc1, keysFunc2, revokeProxy } from './demo7'

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
        // const double = n => n * 2;
        // const pow = n => n * n;
        // const reverseInt = n => n.toString().split('').reverse().join('');
        // console.log(pipe(3).double.pow.reverseInt.get)
        console.log(testPipe(3))
      },
      test4() {
        // const person1 = new Proxy({}, validator)
        // person1.age = 100
        // this.person.age = 100
        // this.person.age = 'sdfsdfsf'
        this.person.age = 333
        console.log(this.person.age)
      },
      test5() {
        console.log(proxyRole.name)
        console.log(proxyRole.age)
        proxyRole.work()
        console.log(Role.name)
        console.log(Role._age)
        Role._work()
        console.log('设置拦截')
        console.log(proxyRole._name)
        console.log(proxyRole._age)
        proxyRole._work()
      },
      test6() {
        const computer = { name: 'Dell 7590', price: 5500 }
        const selfDemo = selfWrapper(computer)
        console.log(selfDemo)
        console.log(selfDemo.name)
        selfDemo.foo = 'bar'
        console.log(selfDemo.foo)
        console.log(selfDemo.foo === selfDemo)
      },
      test7() {
        console.log(`target:${getStr()}`)
        console.log(`proxy:${getStrProxy()}`)
      },
      test8() {
        // 直接运行函数 -- apply
        // 3 种方法都被拦截，效果一样;
        console.log(twice(1, 2))
        // console.log(twice.call(null, 6, 7))
        // console.log(twice.apply(null, [8, 9]))
      },
      test9() {
        console.log(privateProxy.name)
        console.log(privateProxy._name)
        console.log('_name' in privateProxy)
      },
      test10() {
        // 用函数的实例来运行 -- contruct
        console.log(new funcProxy(1111111111))
      },
      test11() {
        deleteFunc()
        // const demo11 = delProxy
        // delete demo11.name;
        // delete demo11.age;
        // console.log(demo11)
        // delete delProxy._name
        // delete delProxy._age
      },
      defineFunc,
      getProtoFunc,
      isExtensibleFunc,
      keysFunc1,
      keysFunc2,
      revokeProxy,
    },
    data() {
      return {
        person,
      }
    },
  }
</script>

