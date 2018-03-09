<template functional>
  <div class="function-demo1">
    <group title="函数式组件的props">
      <cell :title="props.title" />
      <cell :title="props.content" />
    </group>
    <group title="事件监听">
      <x-button type="primary" @click.native="$emit('clickBtn')">emit事件</x-button>
      <x-button type="primary" @click.native="$emit('clickTest')">functional内事件</x-button>
    </group>
    <div @click="$emit('clickBtn')"></div>
  </div>
</template>

<script>
  /* eslint-disable */
  const clickTest = () => {
    console.log('functional 内部的点击事件')
  }

  export default {
    // tips: 1. 函数式组件是依附于 父组件的， components 不需要注册
    props: ['title', 'content'],
    created() {
      console.log(111111111)
    },
  }
</script>

<style lang="scss" scoped>

</style>


