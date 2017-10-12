<template lang="pug">
  .demo-mock-user
    group(title="用户详情")
      cell(title="id" :value="user.id")
      cell(title="name" :value="user.name")
      cell(title="address" :value="user.address")
      cell(title="描述" :value="user.description")
</template>

<script>
  import { Group, Cell } from 'vux'

  export default {
    name: 'mock-user',
    components: {
      Group, Cell,
    },
    created() {
      const { user } = this.$route.params
      this.user = Object.assign({}, user)
    },
    data() {
      return {
        user: {
          id: undefined,
          name: undefined,
          address: undefined,
          description: undefined,
        },
      }
    },
  }
</script>

