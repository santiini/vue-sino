<template lang="pug">
  .demo-vue-reg-index
    group(title="正则表达式的验证")
      x-input(title="正则测试" placeholder="测试特殊字符" :value="name" @on-change="validateInput")
    group(title="测试2")
      .vux-x-input.weui-cell
        .weui-cell__hd
          label.weui-label(for="hometown") 测试2
        .weui-cell__bd.weui-cell__primary
          input.weui-input(type="text" placeholder="测试2" @keyup="changeHometown" :value="hometown")
          //- input.weui-input(type="text"  @onkeyup="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')"）
</template>

<script>
  import { Group, XInput } from 'vux'

  export default {
    name: 'demo-vue-reg-index',
    components: {
      Group, XInput,
    },
    methods: {
      validateInput(val) {
        console.log(val)
        this.name = val.replace(/[^\w\u4E00-\u9FA5]/g, '')
        console.log(this.name)
      },
      changeHometown(e) {
        // console.log(e)
        // console.log(e.key)
        // const val = e.target.val
        this.hometown = this.hometown.replace(/[^\w\u4E00-\u9FA5]/g, '')
        console.log(this.hometown)
      },
    },
    data() {
      return {
        name: '正则',
        hometown: '辛店',
      }
    },
  }
</script>

