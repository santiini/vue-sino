<template lang="pug">
  .function-demo1
    group(:title="title")
      cell(:title="content")
    group(title="事件监听")
      x-button(type="primary" @click.native="$emit('clickBtn')") emit事件
      x-button(type="primary" @click.native="clickTest") functional内事件
</template>

<script>
  import { Group, Cell, XButton } from 'vux'

  export default {
    functional: true,
    components: {
      Group, Cell, XButton,
    },
    props: ['title', 'content'],
  }
</script>

