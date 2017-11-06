<template lang="pug">
  .demo-inherit-child2
    h4 Child2...中
    p boo: {{ boo }}
    p attrs: {{ $attrs }}
    <child-demo3 v-bind="$attrs"></child-demo3>
</template>

<script>
  import ChildDemo3 from './Child3'

  export default {
    name: 'inherit-child2',
    props: ['boo'],
    // inheritAttrs: false 组件将不会把未被注册的propb呈现为普通的HTML属性， 无论 true or false, 都会传值
    inheritAttrs: false,
    components: {
      ChildDemo3,
    },
    created() {
      console.log(this.$attrs)
    },
  }
</script>
