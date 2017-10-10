<template lang="pug">
  .demo-inherit-child1
    h4 Child1...中
    p foo: {{ foo }}
    p attrs: {{ $attrs }}
    <child-demo2 v-bind="$attrs"></child-demo2>
</template>

<script>
  // tips: v-bind="$attrs"的写法在pug中会导致渲染出错
  // tips: 异步加载组件的测试;
  import ChildDemo2 from './Child2'
  // const ChildDemo2 = ()=> import('./Child2.vue')

  export default {
    name: 'inherit-child1',
    props: ['foo'],
    // inheritAttrs: false 组件将不会把未被注册的propb呈现为普通的HTML属性， 无论 true or false, 都会传值
    inheritAttrs: false,
    components: {
      ChildDemo2,
    },
    created() {
      console.log(this.$attrs)
    },
  }
</script>
