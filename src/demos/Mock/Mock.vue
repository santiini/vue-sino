<template lang="pug">
  .demo-mock
    group(title="mockjs本地数据测试")
      x-button(@click.native="loginByName") 登录测试
      x-button(@click.native="logout") 登出
      x-number(title="获取的list长度" :max="20" :min="0" v-model="pageSize")
      x-button(@click.native="getUserList") 获取用户列表
      x-button(@click.native="getList") 获取acticle
      x-button() 待研究Mock的更多用法...
    group(v-show="listVisible" :title="`文章列表: ${list.length}`")
      cell(v-for="(item,i) of list" :key="i" :title="item.title" :inline-desc="item.id")
    group(v-show="userVisible" :title="`用户列表: ${userList.length}`")
      cell(v-for="(item,i) of userList" :key="i" :title="item.name" :inline-desc="item.id"
        :value="item.address" @click.native="getUserDetail(item)")
</template>

<script>
/* eslint-disable no-unused-vars */
  import { Group, XButton, Cell, XNumber } from 'vux'
  import { loginByEmail, logout, getInfo } from '@/api/mock'
  import { getArticle, getList } from '@/api/acticle'
  import { getList as getUsers, getUserDetail } from '@/api/mock-user'

  export default {
    name: 'mock',
    components: {
      Group, XButton, Cell, XNumber,
    },
    methods: {
      // 模拟登录
      async loginByName() {
        try {
          const result = await loginByEmail('admin', '123456')
          console.log(result)
          this.$vux.toast.show({
            type: 'success',
            text: '登录成功',
            isShownMask: true,
            time: 1300,
          })
        } catch (err) {
          console.log(err)
        }
      },
      // 模拟登录
      async logout() {
        try {
          await logout()
        } catch (err) {
          console.log(err)
        }
      },
      // 获取列表
      async getList() {
        try {
          const result = await getList()
          this.list = result
          this.userVisible = false
          this.listVisible = true
        } catch (err) {
          console.log(err)
        }
      },
      // 获取用户
      async getUserList() {
        try {
          const result = await getUsers(this.pageSize)
          this.userList = result
          this.userVisible = true
          this.listVisible = false
        } catch (err) {
          console.log(err)
        }
      },
      // 获取用户详情
      async getUserDetail(user) {
        try {
          const params = {
            id: user.id,
            name: user.name,
            address: user.address,
          }
          const result = await getUserDetail(params)
          this.$router.push({ name: 'mock-user', params: { user: result } })
        } catch (err) {
          console.log(err)
        }
      },
    },
    data() {
      return {
        list: [], // 文章列表,
        userList: [], // 用户列表,
        listVisible: false,
        userVisible: false,
        pageSize: 10, // 获取的list长度
      }
    },
  }
</script>
