<template lang="pug">
  .function-demo1
    group(:title="title")
      cell(:title="content")
</template>

<script>
  export default {
    functional: true,
    props: ['title', 'content'],
    render(createElement, content) {
      return createElement()
    },
  }
</script>

