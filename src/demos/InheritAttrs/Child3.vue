<template lang="pug">
  .demo-inherit-child3
    h4 Child3...中
    p coo: {{coo}}
    p attrs: {{ $attrs }}
</template>

<script>
  export default {
    name: 'inherit-child1',
    props: ['coo'],
    // inheritAttrs: false 组件将不会把未被注册的propb呈现为普通的HTML属性， 无论 true or false, 都会传值
    inheritAttrs: false,
    created() {
      console.log(this.$attrs)
    },
  }
</script>
